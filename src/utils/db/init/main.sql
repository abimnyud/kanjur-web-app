CREATE TABLE users (
  student_id    int NOT NULL,
  name          varchar(50) NOT NULL,
  password      varchar(255) NOT NULL,
  revenue       decimal(12, 2) DEFAULT 0,
  deposit       decimal(12, 2) DEFAULT 0,
  withdraw      decimal(12, 2) DEFAULT 0,
  debt          decimal(12, 2) DEFAULT 0,
  flag          boolean DEFAULT false,
  created_at    timestamp DEFAULT NOW(),
  updated_at    timestamp DEFAULT NOW(),
  deleted_at    timestamp NULL,
  PRIMARY KEY (student_id)
);

CREATE TABLE transactions (
    id            serial4 NOT NULL,
    student_id    integer NOT NULL,
    total_price   decimal(12, 2) NULL DEFAULT 0,
    deposit       decimal(12, 2) NULL DEFAULT 0,
    withdraw      decimal(12, 2) NULL DEFAULT 0,
    balance       decimal(12, 2) NULL DEFAULT 0,
    flag          boolean NOT NULL DEFAULT false,
    created_at    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES "users"(student_id)
);

CREATE TABLE products (
    id                  serial4 NOT NULL,
    name                varchar NOT NULL,
    image               varchar NOT NULL,
    description         varchar NOT NULL,
    price               decimal(12, 2) NOT NULL,
    seller_id           integer NOT NULL,
    transaction_id      integer NULL,
    created_at          timestamp DEFAULT NOW(),
    updated_at          timestamp DEFAULT NOW(),
    deleted_at          timestamp NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (seller_id) REFERENCES "users"(student_id),
    FOREIGN KEY (transaction_id) REFERENCES "transactions"(id)
);

CREATE TABLE cart_links (
  user_id int NOT NULL,
  product_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "users"(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (product_id) REFERENCES "products"(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY ("user_id","product_id")
);