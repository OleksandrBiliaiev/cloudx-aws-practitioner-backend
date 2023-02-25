import { productMock } from './mockData/productMock'

export const  getProductsList = async (event) => {
  try {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(productMock),
    };
    
    return response
  } catch (error) {
    console.error(error);
    
    return error;
  }

};