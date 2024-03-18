CREATE TABLE customers (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100)
);

INSERT INTO customers (id, name, email)
VALUES (1, 'John Doe', 'john.doe@example.com'),
     (2, 'Jane Smith', 'jane.smith@example.com'),
     (3, 'Mike Johnson', 'mike.johnson@example.com');