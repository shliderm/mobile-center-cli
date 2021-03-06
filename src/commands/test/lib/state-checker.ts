import { MobileCenterClient, models, clientCall } from "../../../util/apis";
import { out, StreamingArrayOutput } from "../../../util/interaction";
import * as os from "os";
import * as process from "process";
import { ExitCodes } from "./exit-codes";

export class StateChecker {
  private readonly client: MobileCenterClient;
  private readonly testRunId: string;
  private readonly ownerName: string;
  private readonly appName: string;
  private readonly streamingOutput: StreamingArrayOutput;
  private readonly isInternalStreamingOutput: boolean;

  constructor(client: MobileCenterClient, testRunId: string, ownerName: string, appName: string, streamingOutput?: StreamingArrayOutput) {
    this.client = client;
    this.testRunId = testRunId;
    this.ownerName = ownerName;
    this.appName = appName;
    if(!streamingOutput){
      this.streamingOutput = new StreamingArrayOutput();
      this.isInternalStreamingOutput = true;
    }else{
      this.streamingOutput = streamingOutput;
      this.isInternalStreamingOutput = false;
    }
  }

  public async checkUntilCompleted(timeoutSec: number = null): Promise<number> {
    let exitCode = 0;
    let startTime = process.hrtime();
    if(this.isInternalStreamingOutput){
      this.streamingOutput.start();
    }
    while (true) {
      let state = await out.progress("Checking status...", this.getTestRunState(this.client, this.testRunId));
      this.streamingOutput.text((state) => `Current test status: ${state.message.join(os.EOL)}`, state);
      if (typeof state.exitCode === "number") {
        exitCode = state.exitCode;
        break;
      }

      if (timeoutSec) {
        let elapsedSeconds = process.hrtime(startTime)[0];
        if (elapsedSeconds + state.waitTime > timeoutSec) {
          exitCode = ExitCodes.Timeout;
          this.streamingOutput.text(timeoutSec => `After ${timeoutSec} seconds, command timed out waiting for tests to finish.`, timeoutSec)
          break;
        }
      }

      await out.progress(`Waiting ${state.waitTime} seconds...`, this.delay(1000 * state.waitTime));
    }
    if(this.isInternalStreamingOutput){
      this.streamingOutput.finish();
    }

    return exitCode;
  }

  public async checkOnce(): Promise<number> {
    let state = await out.progress("Checking status...", this.getTestRunState(this.client, this.testRunId));
    if(this.isInternalStreamingOutput){
      this.streamingOutput.start();
    }

    this.streamingOutput.text((state) => `Current test status: ${state.message.join(os.EOL)}`, state);

    if(this.isInternalStreamingOutput){
      this.streamingOutput.finish();
    }

    return state.exitCode;
  }

  private getTestRunState(client: MobileCenterClient, testRunId: string): Promise<models.TestRunState> {
    return clientCall(cb => {
      client.test.getTestRunState(
        testRunId,
        this.ownerName,
        this.appName,
        cb
      );
    });
  }

  private async delay(milliseconds: number): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(resolve, milliseconds);
    });
  }
}