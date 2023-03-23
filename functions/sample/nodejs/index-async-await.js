/**
 * Get all dealerships
 */

const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

PARAM_DICT = {
    "COUCH_URL":process.env.COUCH_URL,
     "IAM_API_KEY": process.env.IAM_API_KEY,
     "COUCH_USERNAME": process.env.IBM_USERNAME,
 }


async function main(params) {
    console.log(params);
      const authenticator = new IamAuthenticator({ apikey: params.IAM_API_KEY })
      const cloudant = CloudantV1.newInstance({
          authenticator: authenticator
      });
      cloudant.setServiceUrl(params.COUCH_URL);
      try {
        let dbList = await cloudant.getAllDbs();
        console.log(dbList.result);
        return { "dbs": dbList.result };
      } catch (error) {
          return { error: error.description };
      }
}

console.log("HOLA");
main(PARAM_DICT);
