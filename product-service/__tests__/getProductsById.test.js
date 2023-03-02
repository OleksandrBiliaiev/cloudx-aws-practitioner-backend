
import { getProductsById } from '../getProductsById'
import { productMock } from '../mockData/productMock'

test('getProductsById handler should return correct response', async () => {
  const response = await getProductsById({ 'pathParameters': { 'productId': '7567ec4b-b10c-48c5-9345-fc73c48a80aa' } });
  expect(response).toBeTruthy();
  expect(response.statusCode).toEqual(200);
  expect(response.hasOwnProperty('body')).toBe(true)
});

test('getProductsById handler should return correct body', async () => {
  const response = await getProductsById({ 'pathParameters': { 'productId': '7567ec4b-b10c-48c5-9345-fc73c48a80aa' } });
  expect(response.body).toEqual(JSON.stringify(productMock[0]));
});

test('getProductsById handler should return No product found for non existing productId', async () => {
  const response = await getProductsById({ 'pathParameters': { 'productId': '123' } });
  expect((response.body)).toEqual('\"No product found\"');
});