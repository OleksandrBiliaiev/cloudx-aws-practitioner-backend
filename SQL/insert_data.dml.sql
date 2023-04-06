INSERT INTO carts (created_at, updated_at, status) 
VALUES 
  ('2023-03-31', '2023-03-31', 'OPEN'),
  ('2023-03-31', '2023-03-31', 'ORDERED'),
  ('2023-03-30', '2023-03-31', 'OPEN'),
  ('2023-03-30', '2023-03-31', 'OPEN'),
  ('2023-03-29', '2023-03-31', 'ORDERED'),
  ('2023-03-29', '2023-03-31', 'OPEN'),
  ('2023-03-28', '2023-03-31', 'OPEN'),
  ('2023-03-28', '2023-03-31', 'ORDERED'),
  ('2023-03-27', '2023-03-31', 'ORDERED'),
  ('2023-03-27', '2023-03-31', 'OPEN');
 
 INSERT INTO cart_items (cart_id, product_id, count) 
VALUES 
  ((select id from carts LIMIT 1), (select user_id , from carts LIMIT 1), '3'),
  ((select id from carts LIMIT 1 offset 1), (select user_id from carts LIMIT 1 offset 1), '2'),
  ((select id from carts LIMIT 1 offset 2), (select user_id from carts LIMIT 1 offset 2), '3'),
  ((select id from carts LIMIT 1 offset 3), (select user_id from carts LIMIT 1 offset 3), '1');