// import { productMock } from './mockData/productMock'
import AWS from 'aws-sdk'

export const getProductsById = async (event) => {
  // Logging
  console.log('getProductsById called!');
  console.log('event:', event);

  const dynamo = new AWS.DynamoDB.DocumentClient();
  const query = async (id) => {
    const queryResult = await dynamo.query({
      TableName: process.env.PRODUCTS_TABLE_NAME,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': id }
    }).promise();

    return queryResult;
  }

  try {
    const { productId } = event.pathParameters;
    const queryResult = await query(productId);
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(await queryResult),
    };

    return response;
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
    }
    return response;
  }
};