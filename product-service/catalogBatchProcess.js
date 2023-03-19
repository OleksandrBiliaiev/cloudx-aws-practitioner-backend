// import { productMock } from './mockData/productMock'
import AWS from 'aws-sdk'

export const catalogBatchProcess = async (event) => {
  // Logging
  console.log('catalogBatchProcess called!');
  console.log('event:', event);
  console.log('event Records:', event.Records);

  // const dynamo = new AWS.DynamoDB.DocumentClient();

  // const putProductTable = async (product) => {
  //   const putResult= await dynamo.put({
  //     TableName: process.env.PRODUCTS_TABLE_NAME,
  //     Item: product
  //   }).promise();
  //   return putResult;
  // }

  // const putStockTable = async (product) => {
  //   const putResult= await dynamo.put({
  //     TableName: process.env.STOCKS_TABLE_NAME,
  //     Item: {'product_id': product.id, 'count': product.count}
  //   }).promise();
  //   return putResult;
  // }

  try {
    // const product = JSON.parse(event.body);
    // const putTransactionResult = await dynamo.transactWrite(putProductTable(product), putStockTable(product));

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      // body: JSON.stringify(await putProductTable(product), await putStockTable(product)),
      body: JSON.stringify(putTransactionResult),
    };

    return response
  } catch (error) {
    console.error(error);

    const response = {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(error),
  }
  return response;
  }

};