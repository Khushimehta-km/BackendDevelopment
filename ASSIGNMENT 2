# Assignment 2 — PostgreSQL as SQL + NoSQL: Working with JSONB

## Part A — Conceptual Questions

### 1. What is `jsonb` in PostgreSQL, and how does it differ from the plain `json` type?

PostgreSQL provides two data types for storing JSON data: `json` and `jsonb`. The main difference is how the data is stored internally. The `json` type stores the JSON as plain text, so PostgreSQL has to parse the JSON whenever it needs to process the contents. On the other hand, `jsonb` stores the data in a decomposed binary format. Because of this, `jsonb` generally takes slightly more time when inserting or updating data because PostgreSQL has to convert the JSON into its binary representation.

However, `jsonb` is usually much faster for reading, searching, and querying JSON data because it does not need to repeatedly parse the JSON text. It also supports indexing, especially GIN indexes, which can make searches inside JSON documents much faster. `json` can be useful when the exact original formatting of JSON needs to be preserved, but `jsonb` is generally preferred when the application frequently queries JSON data.

For example:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    attributes JSONB
);

INSERT INTO products (name, attributes)
VALUES ('Laptop', '{"brand": "Dell", "ram": 16, "color": "black"}');

SELECT attributes->>'brand'
FROM products;
```

Here, `attributes` is stored as `jsonb`, allowing PostgreSQL to efficiently query individual JSON values and use indexes on the column.

---

### 2. How can PostgreSQL work as both a SQL and a NoSQL database in the same table?

PostgreSQL can combine traditional relational SQL features with document-style NoSQL features by using a `jsonb` column along with normal strongly typed columns. The relational columns can contain data that has a fixed structure, such as an `id`, `name`, and `price`. At the same time, a `jsonb` column can store attributes that may differ from one record to another.

For example, an online store may have common information such as product ID, name, and price for every product. However, a laptop may have RAM and processor attributes, while a shoe may have size and material attributes. Instead of creating separate columns for every possible attribute, these changing properties can be stored inside a `jsonb` column.

Example:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    attributes JSONB
);

INSERT INTO products (name, price, attributes)
VALUES
('Laptop', 65000, '{"ram": 16, "processor": "i5"}'),
('Shoes', 2500, '{"size": 9, "material": "leather"}');
```

Here, `id`, `name`, and `price` follow a strict relational structure, while `attributes` provides flexible document-style storage. PostgreSQL can therefore provide SQL features such as constraints, joins, and transactions while also supporting flexible NoSQL-like JSON documents in the same table.

---

### 3. Give an example of a `jsonb` query using `->`, `->>`, `@>`, and `?`

PostgreSQL provides several operators for working with `jsonb` values. The `->` operator extracts a JSON object or JSON value, while the `->>` operator extracts the value as text. This difference is important when the extracted value needs to be used as normal text.

Consider this table:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    attributes JSONB
);

INSERT INTO products (name, attributes)
VALUES
('Laptop', '{"brand": "Dell", "ram": 16, "color": "black"}');
```

Using `->`:

```sql
SELECT attributes->'brand'
FROM products;
```

It returns:

```text
"Dell"
```

The result is still a JSON value.

Using `->>`:

```sql
SELECT attributes->>'brand'
FROM products;
```

It returns:

```text
Dell
```

The result is text.

The `@>` operator checks whether one JSON document contains another:

```sql
SELECT name
FROM products
WHERE attributes @> '{"ram": 16}';
```

It returns:

```text
Laptop
```

The `?` operator checks whether a particular key exists:

```sql
SELECT name
FROM products
WHERE attributes ? 'color';
```

It also returns:

```text
Laptop
```

Therefore, `->` returns a JSON value, whereas `->>` returns a text value. `@>` is useful for checking contained JSON data, and `?` is useful for checking whether a key exists.

---

### 4. How can a GIN index on a `jsonb` column change query performance?

A GIN (Generalized Inverted Index) index can significantly improve the performance of queries that search inside a `jsonb` column. Without an appropriate index, PostgreSQL may need to examine many rows and inspect their JSON data individually. With a GIN index, PostgreSQL maintains an index structure that makes it faster to find rows containing particular keys or JSON values.

For example, suppose a table contains many products:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    attributes JSONB
);
```

A GIN index can be created using:

```sql
CREATE INDEX idx_products_attributes
ON products
USING GIN (attributes);
```

Now a containment query such as:

```sql
SELECT *
FROM products
WHERE attributes @> '{"ram": 16}';
```

can benefit from the GIN index, especially when the table contains a large number of rows. Queries that check whether a JSON key or value exists can also benefit from suitable GIN indexing.

However, a GIN index is not automatically useful for every possible query. For example:

```sql
SELECT *
FROM products
WHERE price > 50000;
```

does not use the `attributes` GIN index because `price` is a separate relational column. A normal B-tree index on `price` would be more appropriate.

Therefore, GIN indexes are particularly useful for searching and filtering JSONB contents, but the correct index depends on the type of query being performed.

---

### 5. Where could PostgreSQL + `jsonb` replace a MongoDB deployment, and where would MongoDB still be the better fit?

PostgreSQL with `jsonb` can replace MongoDB in applications that need flexible document-style data but also require strong relational database features. PostgreSQL provides ACID transactions, foreign keys, joins, constraints, and schema enforcement for normal columns. At the same time, `jsonb` allows applications to store flexible or changing attributes without creating a large number of columns.

For example, an e-commerce application can store product ID, name, price, and category as normal relational columns while storing different product specifications in a `jsonb` column. This is useful when the application needs both flexible data and reliable transactions.

PostgreSQL can therefore be a good fit when relationships between data are important and the application frequently uses joins or transactions.

MongoDB can still be a better fit for applications that are strongly document-oriented and require very flexible schemas across large numbers of documents. MongoDB is designed around document storage and can be scaled horizontally across multiple servers using sharding. PostgreSQL also supports horizontal scaling technologies and distributed solutions, but its traditional strength is relational data management.

Therefore, the choice depends on the application. PostgreSQL + `jsonb` is useful when flexible JSON data needs to coexist with SQL features such as transactions, joins, and constraints. MongoDB may be preferred when document-oriented storage, flexible schemas, and large-scale horizontal distribution are the primary requirements.
