// import { productMock } from './mockData/productMock'
import AWS from 'aws-sdk'

export const getProductsList = async (event) => {

  const dynamo = new AWS.DynamoDB.DocumentClient();
  const scan = async (TableName) => {
    const scanResult = await dynamo.scan({ TableName }).promise();
    return scanResult;
  }

  try {
    const getProducts = async () => {
      const products = await (await scan(process.env.PRODUCTS_TABLE_NAME || 'CloudX_Products')).Items;

      return products;

    }
    const getStocks = async () => {
      const stocks = await (await scan(process.env.STOCKS_TABLE_NAME || "CloudX_Stocks")).Items;

      return stocks;

    }

    const getFullProductsData = async () => {
      const stocks = await getStocks();
      const products = await getProducts();
      return { stocks, products }
    }

    const getFormattedProductDat = async () => {
      const fullData = await getFullProductsData();
      const formattedData = fullData.products.map(product => {
        const stock = fullData.stocks.find(stock => stock.product_id === product.id);
        product.count = stock.count;
        return product;
      })
      return formattedData;
    }

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(await getFormattedProductDat()),
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