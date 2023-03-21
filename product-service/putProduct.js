import AWS from 'aws-sdk'

export const putProduct = async (event) => {
  console.log('putProduct called!');
  console.log('event:', event);

  const dynamo = new AWS.DynamoDB.DocumentClient();

  const putProductTable = async (product) => {
    const putResult= await dynamo.put({
      TableName: (process.env.PRODUCTS_TABLE_NAME || 'CloudX_Products'),
      Item: product
    }).promise();
    return putResult;
  }

  const putStockTable = async (product) => {
    const putResult= await dynamo.put({
      TableName: (process.env.STOCKS_TABLE_NAME || 'CloudX_Stocks'),
      Item: {'product_id': product.id, 'count': product.count}
    }).promise();
    return putResult;
  }

  try {
    // const product = JSON.parse('{"count":3,"description":"Some other bike","id":"dasda!231","price":22,"title":"supertitle"}');
    const product = JSON.parse(event.body);
    const putTransactionResult = await dynamo.transactWrite(putProductTable(product), putStockTable(product));

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
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