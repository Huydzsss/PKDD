const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3010;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// Kết nối tới cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'products'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Định nghĩa địa chỉ endpoint API để xử lý yêu cầu GET tất cả sản phẩm từ trang "Best_product"
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Error fetching products');
      return;
    }
    res.json(results);
  });
});

app.get('/products/contactus', (req, res) => {
  const query = 'SELECT * FROM contactus';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching contactus:', err);
      res.status(500).send('Error fetching contactus');
      return;
    }
    res.json(results);
  });
});

app.post('/products/contactus', (req, res) => {
  const { Name, Email, Phone, Subject, Message } = req.body;
  const created_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updated_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = 'INSERT INTO contactus (Name, Email, Phone, Subject, Message, created_date, updated_date) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  connection.query(query, [Name, Email, Phone, Subject, Message, created_date, updated_date], (err, results) => {
    if (err) {
      console.error('Error inserting contactus:', err);
      res.status(500).send('Error inserting contactus');
      return;
    }
    res.status(201).send('contactus information submitted successfully');
  });
});

app.post('/products/shopping_cart', (req, res) => {
  const { product_id, quantity } = req.body;
  const query = 'INSERT INTO shopping_cart (product_id, quantity) VALUES (?, ?)';
  connection.query(query, [product_id, quantity], (err, results) => {
    if (err) {
      console.error('Error inserting into shopping cart:', err);
      res.status(500).send('Error inserting into shopping cart');
      return;
    }
    res.status(201).send('Product added to shopping cart successfully');
  });
});

app.get('/products/customers', (req, res) => {
  const query = 'SELECT * FROM customers';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching customers:', err);
      res.status(500).send('Error fetching customers');
      return;
    }
    res.json(results);
  });
});

app.post('/products/customers', (req, res) => {
  const { action, email, password, username } = req.body;

  if (action === 'register') {
    emailAlreadyExists(email, (exists) => {
      if (exists) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      registerUser({ email, password, username }, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } else if (action === 'login') {
    checkUserCredentials(email, password, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking user credentials' });
      }
      if (user) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(400).json({ message: 'Invalid email or password' });
      }
    });
  } else {
    res.status(400).json({ message: 'Invalid action' });
  }
});

function emailAlreadyExists(email, callback) {
  const query = 'SELECT * FROM customers WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return callback(true);
    }
    callback(results.length > 0);
  });
}

function registerUser({ email, password, username }, callback) {
  const query = 'INSERT INTO customers (email, password, username) VALUES (?, ?, ?)';
  connection.query(query, [email, password, username], (err, results) => {
    if (err) {
      console.error('Error registering user:', err);
      return callback(err);
    }
    callback(null);
  });
}

function checkUserCredentials(email, password, callback) {
  const query = 'SELECT * FROM customers WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error checking user credentials:', err);
      return callback(err, null);
    }
    if (results.length > 0) {
      callback(null, results[0]);
    } else {
      callback(null, null);
    }
  });
}

app.get('/products/new_products', (req, res) => {
  const query = 'SELECT * FROM new_products';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching new_products:', err);
      res.status(500).send('Error fetching new_products');
      return;
    }
    res.json(results);
  });
});
app.get('/products/orders', (req, res) => {
  const query = 'SELECT * FROM orders';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).send('Error fetching orders');
      return;
    }
    res.json(results);
  });
});

// Khởi động máy chủ
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
