import AWS from 'aws-sdk'

export const catalogBatchProcess = async ({ Records }) => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const sns = new AWS.SNS();

  const putProductTable = async ({ id, description, price, title }) => {
    const putResult = await dynamo.put({
      TableName: (process.env.PRODUCTS_TABLE_NAME || 'CloudX_Products'),
      Item: { id, description, price, title }
    }).promise();
    return putResult;
  }

  const putStockTable = async ({id, count}) => {
    const putResult = await dynamo.put({
      TableName: (process.env.STOCKS_TABLE_NAME || 'CloudX_Stocks'),
      Item: { 'product_id': id, count }
    }).promise();
    return putResult;
  }

  try {
    const asyncRes = await Promise.all(Records.map(async ({ body }) => {
      const product = JSON.parse(body);
      product.count = +product.count;
      product.price = +product.price;
      const result = await dynamo.transactWrite(putProductTable(product), putStockTable(product));
    }));

    const message = {
      message: 'Product(s) successfully created',
      result: asyncRes
    }

    const params = {
      Message: JSON.stringify(message),
      TopicArn: 'arn:aws:sns:us-east-1:043770472754:createProductTopic'
    };

    await sns.publish(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Products created successfully.' })
    };

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