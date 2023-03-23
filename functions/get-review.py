from cloudant.client import Cloudant
from cloudant.error import CloudantException
import requests
import os
from cloudant.query import Query


from ibmcloudant.cloudant_v1 import CloudantV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator


def main(response):
    if 1==1:
        dealerId = int(15)
        try:
            authenticator = IAMAuthenticator(os.environ['IAM_API_KEY'])
            service = CloudantV1(authenticator=authenticator)
            service.set_service_url(os.environ['COUCH_URL'])

            response = service.post_find(
                db='reviews',
                selector={'dealership': {'$eq': dealerId}},
                ).get_result()
            result = response['docs']
            len_result = len(result)
            if(len_result==0):
                return {
                'statusCode': 404,
                'message': 'DealerId does not exist'}
            else:
                print(result)
                return result
        except:
            return {
            'statusCode': 500,
            'message': 'Something went wrong on the server'
            }

def main(param):
    get_all_review(param)

if __name__ == "__main__":
    main(None)