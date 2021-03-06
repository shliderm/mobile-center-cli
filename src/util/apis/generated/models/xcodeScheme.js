/*
 * Code generated by Microsoft (R) AutoRest Code Generator 0.17.0.0
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * @class
 * Initializes a new instance of the XcodeScheme class.
 * @constructor
 * @member {string} name Scheme name
 * 
 * @member {boolean} hasTestAction Does scheme have a test action?
 * 
 * @member {string} [archiveConfiguration] Build configuration set in Archive
 * action
 * 
 * @member {string} [targetToArchive] The Id of the target to archive
 * 
 */
function XcodeScheme() {
}

/**
 * Defines the metadata of XcodeScheme
 *
 * @returns {object} metadata of XcodeScheme
 *
 */
XcodeScheme.prototype.mapper = function () {
  return {
    required: false,
    serializedName: 'XcodeScheme',
    type: {
      name: 'Composite',
      className: 'XcodeScheme',
      modelProperties: {
        name: {
          required: true,
          serializedName: 'name',
          type: {
            name: 'String'
          }
        },
        hasTestAction: {
          required: true,
          serializedName: 'hasTestAction',
          type: {
            name: 'Boolean'
          }
        },
        archiveConfiguration: {
          required: false,
          serializedName: 'archiveConfiguration',
          type: {
            name: 'String'
          }
        },
        targetToArchive: {
          required: false,
          serializedName: 'targetToArchive',
          type: {
            name: 'String'
          }
        }
      }
    }
  };
};

module.exports = XcodeScheme;
