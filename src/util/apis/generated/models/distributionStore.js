/*
 * Code generated by Microsoft (R) AutoRest Code Generator 0.17.0.0
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * @class
 * Initializes a new instance of the DistributionStore class.
 * @constructor
 * @member {string} [id] ID identifying a unique distribution store.
 * 
 * @member {string} [name] A name identifying a unique distribution store.
 * 
 * @member {boolean} [isLatest] Is the containing release the latest one in
 * this distribution store.
 * 
 * @member {string} [type] type of the distribution store currently stores
 * type can be intune or googleplay. Possible values include: 'intune',
 * 'googleplay'
 * 
 * @member {string} [publishingStatus] publishing status of the release in the
 * store.
 * 
 */
function DistributionStore() {
}

/**
 * Defines the metadata of DistributionStore
 *
 * @returns {object} metadata of DistributionStore
 *
 */
DistributionStore.prototype.mapper = function () {
  return {
    required: false,
    serializedName: 'DistributionStore',
    type: {
      name: 'Composite',
      className: 'DistributionStore',
      modelProperties: {
        id: {
          required: false,
          serializedName: 'id',
          type: {
            name: 'String'
          }
        },
        name: {
          required: false,
          serializedName: 'name',
          type: {
            name: 'String'
          }
        },
        isLatest: {
          required: false,
          serializedName: 'is_latest',
          type: {
            name: 'Boolean'
          }
        },
        type: {
          required: false,
          serializedName: 'type',
          type: {
            name: 'String'
          }
        },
        publishingStatus: {
          required: false,
          serializedName: 'publishing_status',
          type: {
            name: 'String'
          }
        }
      }
    }
  };
};

module.exports = DistributionStore;
