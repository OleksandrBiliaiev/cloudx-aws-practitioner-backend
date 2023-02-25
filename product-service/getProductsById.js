import { productMock } from './mockData/productMock'
export const getProductsById = async (event) => {
  try {
    const { productId } = event.pathParameters;
    const found = productMock.find(el => el.id === productId);
    const result = found ? found : 'No product found'
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    };

    return response;
  } catch (error) {
    console.error(error);

    return error;
  }

};