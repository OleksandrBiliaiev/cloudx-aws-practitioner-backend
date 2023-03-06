
// const handler = require('../getProductsList');
import { getProductsList } from '../getProductsList'
// const { productMock } = require('../data/productMock')
import { productMock } from '../mockData/productMock'

test('getProductsList handler should return correct response', async () => {
  const response = await getProductsList();
  expect(response).toBeTruthy();
  expect(response.statusCode).toEqual(200);
  expect(response.hasOwnProperty('body')).toBe(true)
});

test('getProductsList handler should return correct body', async () => {
  const response = await getProductsList();
  expect(response.body).toEqual(JSON.stringify(productMock));
});