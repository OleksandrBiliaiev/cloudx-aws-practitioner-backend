// import { productMock } from './mockData/productMock'
import AWS from 'aws-sdk'

export const importProductsFile = async (event) => {
  const BUCKET = 'aws-cloudx-bike-shop-product-import';
  const s3 = new AWS.S3({ region: 'us-east-1' });


  try {
    const name = event.queryStringParameters.name;
    const params = {
      Bucket: BUCKET,
      Key: `uploaded/${name}`,
      Expires: 60,
      ContentType: 'text/csv'
    }

    if (!name) {
      return {
        statusCode: 400,
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({ error: 'Missing name parameter' }),
      };
    }

    const url = await s3.getSignedUrlPromise('putObject', params);

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( url ),
    };

    return response
  } catch (error) {
    console.error(error);
    const response = {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(error),
    };
    return response;
  }

};