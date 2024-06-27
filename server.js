const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const paypal = require('paypal-rest-sdk'); // Sử dụng paypal-rest-sdk thay vì @paypal/checkout-server-sdk
const session = require('express-session');

const app = express();
const port =  3010;

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

// Sử dụng session middleware
app.use(session({
  secret: '11111', // Khóa bí mật cho session
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Có thể cần cấu hình lại khi triển khai ở production
}));

// Kết nối đến cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pkdd'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Khóa bí mật JWT
const secretKey = process.env.JWT_SECRET || 'konodia';

// Hàm tạo và xác thực token JWT
function generateToken(user) {
  const payload = { customers_id: user.customers_id, email: user.email };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

// Middleware xác thực token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}

// Thiết lập thông tin xác thực PayPal
paypal.configure({
  mode: 'sandbox', // Chế độ sandbox hoặc live
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
});

// Endpoint API lấy danh sách sản phẩm từ "Best_product"
app.get('/pkdd/products', (req, res) => {
  const query = 'SELECT * FROM products';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching pkdd:', err);
      res.status(500).json({ error: 'Error fetching pkdd' });
      return;
    }
    res.json(results);
  });
});

// Endpoint lấy thông tin liên hệ
app.get('/pkdd/contactus', (req, res) => {
  const query = 'SELECT * FROM contactus';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching contactus:', err);
      res.status(500).json({ error: 'Error fetching contactus' });
      return;
    }
    res.json(results);
  });
});
// app.post('/pkdd/contactus', (req, res) => {
//   const { ID, Name, Email, Phone, Message, Subject, created_date, updated_date, address } = req.body;

//   // Validate incoming data if necessary
  
//   const query = 'INSERT INTO contactus (ID, Name, Email, Phone, Message, Subject, created_date, updated_date, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
//   const values = [ID, Name, Email, Phone, Message, Subject, created_date, updated_date, address];

//   connection.query(query, values, (err, results) => {
//     if (err) {
//       console.error('Error insertingcontactus:', err);
//       res.status(500).json({ error: 'Error inserting contactus' });
//       return;
//     }
//     console.log('Inserted contactus into contactus:', results);
//     res.json(results); // Optional: Return the inserted product ID or any other relevant data
//   });
// });

// Endpoint lấy pkdd
app.get('/pkdd/new_products', (req, res) => {
  const query = 'SELECT * FROM new_products';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching new_pkdd:', err);
      res.status(500).json({ error: 'Error fetching new_pkdd' });
      return;
    }
    res.json(results);
  });
});
// Endpoint để lấy danh sách reviews của một sản phẩm cụ thể
app.get('/pkdd/reviews/:productId', (req, res) => {
  const productId = req.params.productId;
  const sql = 'SELECT * FROM reviews WHERE productId = ?';

  connection.query(sql, [productId], (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      res.status(500).json({ error: 'Error fetching reviews' });
      return;
    }
    res.json(results);
  });
});



// Endpoint to create a new review
app.post('/pkdd/reviews', (req, res) => {
  const { productId, rating, text,customerName } = req.body;
  const sql = 'INSERT INTO reviews (productId, rating, text,customerName) VALUES (?, ?, ?,?)';
  const values = [productId, rating, text,customerName];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding review:', err);
      res.status(500).json({ error: 'Error adding review' });
      return;
    }
    res.status(201).json({ message: 'Review added successfully', reviewId: result.insertId });
  });
});

// Endpoint thêm thông tin liên hệ
app.post('/pkdd/contactus', (req, res) => {
  const { Name, Email, Phone, Subject, Message } = req.body;
  const created_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updated_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = 'INSERT INTO contactus (Name, Email, Phone, Subject, Message, created_date, updated_date) VALUES (?, ?, ?, ?, ?, ?, ?)';

  connection.query(query, [Name, Email, Phone, Subject, Message, created_date, updated_date], (err, results) => {
    if (err) {
      console.error('Error inserting contactus:', err);
      res.status(500).json({ error: 'Error inserting contactus' });
      return;
    }
    res.status(201).json({ message: 'Contactus information submitted successfully' });
  });
});

// Endpoint lấy thông tin giỏ hàng
app.get('/pkdd/shopping_cart', (req, res) => {
  const cartId = req.params.cart_id;
  const query = `
    SELECT 
      shopping_cart.cart_id, 
      shopping_cart.quantity, 
      shopping_cart.created_at, 
      products.image1 AS product_image1, 
      products.name AS product_name, 
      products.price 
    FROM 
      shopping_cart 
    INNER JOIN 
      products 
    ON 
      shopping_cart.product_id = products.id
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching shopping_cart:', err);
      res.status(500).json({ error: 'Error fetching shopping_cart' });
      return;
    }
    res.json(results);
  });
});

// Endpoint thêm sản phẩm vào giỏ hàng
app.post('/pkdd/shopping_cart', (req, res) => {
  const { product_id, quantity, product_image1, product_name } = req.body;
  const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = 'INSERT INTO shopping_cart (product_id, quantity, product_image1, product_name, created_at) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [product_id, quantity, product_image1, product_name, created_at], (err, results) => {
    if (err) {
      console.error('Error inserting into shopping cart:', err);
      res.status(500).json({ error: 'Error inserting into shopping cart' });
      return;
    }

    const insertedProductId = results.insertId;
    const selectQuery = 'SELECT * FROM shopping_cart WHERE cart_id = ?';
    connection.query(selectQuery, [insertedProductId], (selectErr, selectResults) => {
      if (selectErr) {
        console.error('Error fetching inserted product:', selectErr);
        res.status(500).json({ error: 'Error fetching inserted product' });
        return;
      }

      const insertedProduct = selectResults[0];
      res.status(201).json({ message: 'Product added to shopping cart successfully', product: insertedProduct });
    });
  });
});
// Endpoint cập nhật số lượng sản phẩm trong giỏ hàng
app.put('/pkdd/shopping_cart/:cart_id', (req, res) => {
  const { quantity } = req.body;
  const cartId = req.params.cart_id;
  const updateQuery = 'UPDATE shopping_cart SET quantity = ? WHERE cart_id = ?';

  connection.query(updateQuery, [quantity, cartId], (err, result) => {
    if (err) {
      console.error('Error updating product quantity:', err);
      res.status(500).json({ error: 'Error updating product quantity' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Product not found in shopping cart' });
      } else {
        res.status(200).json({ message: 'Product quantity updated successfully.' });
      }
    }
  });
});

// Endpoint xóa sản phẩm khỏi giỏ hàng
app.delete('/pkdd/shopping_cart/:cart_id', (req, res) => {
  const cartId = req.params.cart_id;
  const deleteQuery = `DELETE FROM shopping_cart WHERE cart_id = ?`;

  connection.query(deleteQuery, [cartId], (err, result) => {
    if (err) {
      console.error('Error deleting product from shopping cart:', err);
      res.status(500).json({ error: 'An error occurred while deleting the product from the shopping cart.' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Product not found in shopping cart' });
      } else {
        res.status(200).json({ message: 'Product deleted from shopping cart successfully.' });
      }
    }
  });
});

// Endpoint lấy thông tin khách hàng (yêu cầu xác thực JWT)
app.get('/pkdd/customers', authenticateToken, (req, res) => {
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

// Endpoint đăng ký và đăng nhập người dùng
app.post('/pkdd/customers', (req, res) => {
  const { action, email, password, username } = req.body;

  if (!action || !email || !password || (action === 'register' && !username)) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (action === 'register') {
    emailAlreadyExists(email, (err, exists) => {
      if (err) {
        console.error('Error checking email existence:', err);
        return res.status(500).json({ message: 'Error checking email existence' });
      }
      if (exists) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      registerUser({ email, password, username }, (err) => {
        if (err) {
          console.error('Error registering user:', err);
          return res.status(500).json({ message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } else if (action === 'login') {
    checkUserCredentials(email, password, (err, user) => {
      if (err) {
        console.error('Error checking user credentials:', err);
        return res.status(500).json({ message: 'Error checking user credentials' });
      }
      if (user) {
        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful', token, user }); // Bao gồm dữ liệu người dùng trong phản hồi
      } else {
        res.status(400).json({ message: 'Invalid email or password' });
      }
    });
  } else {
    res.status(400).json({ message: 'Invalid action' });
  }
});

// Hàm kiểm tra xem email đã tồn tại chưa
function emailAlreadyExists(email, callback) {
  const query = 'SELECT * FROM customers WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results.length > 0);
  });
}

// Hàm đăng ký người dùng
function registerUser(user, callback) {
  const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = 'INSERT INTO customers (email, password, username, created_at) VALUES (?, ?, ?, ?)';
  connection.query(query, [user.email, user.password, user.username, created_at], callback);
}

// Hàm kiểm tra thông tin đăng nhập của người dùng
function checkUserCredentials(email, password, callback) {
  const query = 'SELECT * FROM customers WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    callback(null, results[0]);
  });
}

// Endpoint lấy danh sách đơn hàng
app.get('/pkdd/orders', (req, res) => {
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


// Endpoint để xử lý yêu cầu thanh toán PayPal
let roundedTotalAmount; 

app.post('/pkdd/paypal_payment', (req, res) => {
  const fetchCartQuery = `
  SELECT 
    shopping_cart.cart_id, 
    shopping_cart.product_id,
    shopping_cart.quantity, 
    shopping_cart.created_at, 
    products.image1 AS product_image1, 
    products.name AS product_name, 
    products.price 
  FROM 
    shopping_cart 
  INNER JOIN 
    products 
  ON 
    shopping_cart.product_id = products.id
`;


  connection.query(fetchCartQuery, (err, shoppingCart) => {
    if (err) {
      console.error('Error fetching shopping cart:', err);
      res.status(500).json({ error: 'Error fetching shopping cart' });
      return;
    }

    console.log('Shopping cart data:', shoppingCart);

    let totalAmount = 0;
    shoppingCart.forEach(item => {
      totalAmount += item.price * item.quantity;
    });

    roundedTotalAmount = totalAmount.toFixed(2);

    const items = shoppingCart.map(item => {
      if (!item.product_id) {
        console.error('Error: product_id is undefined for item:', item);
        res.status(500).json({ error: 'Error processing shopping cart items' });
        return;
      }

      return {
        sku: item.product_id.toString(),
        name: item.product_name,
        price: item.price.toFixed(2),
        currency: 'USD',
        quantity: item.quantity
      };
    });

    if (items.includes(undefined)) {
      return;
    }

    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: 'http://localhost:3010/pkdd/paypal_success',
        cancel_url: 'http://localhost:3010/pkdd/paypal_cancel'
      },
      transactions: [{
        item_list: {
          items: items
        },
        amount: {
          currency: 'USD',
          total: roundedTotalAmount,
          details: {
            subtotal: roundedTotalAmount
          }
        },
        description: 'Payment for items in shopping cart.'
      }]
    };

    console.log('Item list sent to PayPal:', create_payment_json.transactions[0].item_list);

    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        console.error('Error creating PayPal payment:', error);
        res.status(500).json({ error: 'Error creating PayPal payment' });
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.json({ approvalUrl: payment.links[i].href });
            return;
          }
        }
        res.status(500).json({ error: 'No approval URL found in PayPal response' });
      }
    });
  });
});

// Endpoint xử lý thanh toán thành công PayPal
app.get('/pkdd/paypal_success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [{
      amount: {
        currency: 'USD',
        total: roundedTotalAmount 
      }
    }]
  };

  // Thực hiện xác nhận thanh toán với PayPal
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.error('Error executing PayPal payment:', error);
      res.status(500).send('Error executing PayPal payment');
    } else {
      console.log("Payment executed successfully:", payment);

      // Xóa các mục trong giỏ hàng đã thanh toán thành công
      const cartItems = payment.transactions[0].item_list.items;
      const cartItemIds = cartItems.map(item => item.sku); // Giả sử sku là id của sản phẩm trong giỏ hàng

      const deleteQuery = 'DELETE FROM shopping_cart WHERE product_id IN (?)';
      connection.query(deleteQuery, [cartItemIds], (err, result) => {
        if (err) {
          console.error('Error deleting pkdd from shopping cart:', err);
          res.status(500).send('Error deleting pkdd from shopping cart');
        } else {
          console.log('Deleted pkdd from shopping cart:', result.affectedRows);
          res.send('Payment successful.');
        }
      });
    }
  });
});


// Endpoint hủy thanh toán PayPal
app.get('/pkdd/paypal_cancel', (req, res) => {
  res.send('Cancelled');
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
