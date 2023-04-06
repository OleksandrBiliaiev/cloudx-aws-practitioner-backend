CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE carts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID DEFAULT uuid_generate_v4() NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('OPEN', 'ORDERED'))
);

CREATE TABLE cart_items (
  cart_id UUID REFERENCES carts(id),
  product_id UUID,
  count INTEGER
);