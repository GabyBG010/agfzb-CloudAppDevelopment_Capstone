/**
 * Get all databases
 */

PARAM_DICT = {
    "COUCH_URL":"https://62b102fd-4f43-4844-879d-b27dab7a2384-bluemix.cloudantnosqldb.appdomain.cloud",
     "IAM_API_KEY": "bJSOVLYIaMDM5s3AOe2J3TiNGWq5-X_SXq9iq_LzEkk7",
     "COUCH_USERNAME": "62b102fd-4f43-4844-879d-b27dab7a2384-bluemix"
 }


 const { CloudantV1 } = require("@ibm-cloud/cloudant");
 const { IamAuthenticator } = require("ibm-cloud-sdk-core");
 
 function main(params) {
     console.log("GHOLA");
   const authenticator = new IamAuthenticator({ apikey: params.IAM_API_KEY });
   const cloudant = CloudantV1.newInstance({
     authenticator: authenticator,
   });
   cloudant.setServiceUrl(params.COUCH_URL);
 
   let dbList = getDbs(cloudant);
   return { dbs: dbList };
 }
 
 function getDbs(cloudant) {
   cloudant
     .getAllDbs()
     .then((body) => {
       body.forEach((db) => {
         dbList.push(db);
       });
     })
     .catch((err) => {
       console.log(err);
     });
 }

 main(PARAM_DICT);