
/////////////// CONNECTING TO DATABASE (PostGres) ////////////////////

const express = require("express");
const Pool = require('pg').Pool
const bodyParser = require("body-parser")
const app = express();

app.use(express.static('.'))
app.use(bodyParser.urlencoded({extended: true}));


const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'postgres',
   password: 'postgres',
   port: 5432,
})

app.get("/prices", function(req, res){
    const prices = {
        newShirts: "$35.00",
        BestSellers: "$30.00"
    };
    res.json(prices);
})

app.get("/api/product", (req, res) => {

   const productId = req.query.id;
   let sql = "SELECT * FROM product";

   // If productId is provided, fetch the product with that ID
   const params = [];
   if (productId) {
       sql += ` WHERE id = $1`;
       params.push(productId);
   }
   pool.query(sql, (error, results) => {

        if (error) throw error

        res.status(200).json(results.rows)
   })
});

app.get("/api/reviews", (req, res) => {

    const sql = "SELECT * FROM reviews";
 
    pool.query(sql, (error, results) => {
 
         if (error) throw error
 
         res.status(200).json(results.rows)
    })
 });

app.get("/api/purchased", (req, res) => {
    const sql = "SELECT * FROM reviews";

    pool.query(sql, (error, results) => {
        if (error) throw error

        res.status(200).json(results.rows)
    })
})

app.post("/api/product/create", (req, res) => {
    console.log(req.body);

    const id = req.body.id;
    const productname = req.body.productname;
    const price = req.body.price;

    const sql = "INSERT INTO product(id, productname, price) VALUES($1,$2,$3)";

    const data = [id, productname, price];

    pool.query(sql, data, (error, results) => {
        if (error) throw error
        
        res.status(200).json(results.row)
    });
});

app.post("/api/users/create", (req, res) => {

    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    // Add here the sql

    const sql = "INSERT INTO users (password, email, username) VALUES ($1,$2,$3)";

    const data = [password, email, username];

    pool.query(sql, data, (error, results) => {
        if (error) throw error
        
        res.status(200).json(results.row)
    });
});

app.post("/api/contactform/create", (req, res) => {

    console.log(req.body);

    const name = req.body.name;
    const phonenum = req.body.phonenum;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    // Add here the sql

    const sql = "INSERT INTO contactform (name, phonenum, email, subject, message) VALUES ($1,$2,$3,$4,$5)";

    const data = [name, phonenum, email, subject, message];

    pool.query(sql, data, (error, results) => {
        if (error) throw error
        
        res.status(200).json(results.row)
    });
});

app.post("/api/reviews/create", (req, res) => {

    console.log(req.body);

    const reviewname = req.body.reviewname;
    const locate = req.body.locate;
    const response = req.body.response;

    // Add here the sql

    const sql = "INSERT INTO reviews (reviewname, locate, response) VALUES ($1,$2,$3)";

    const data = [reviewname, locate, response];

    pool.query(sql, data, (error, results) => {
        if (error) throw error
        
        res.status(200).json(results.row)
    });
});


app.post("/api/purchased/create", (req, res) => {

    console.log(req.body);

    const product = req.body.product;
    const price = req.body.price;
    const orderID = req.body.orderID;
    

    // Add here the sql

    const sql = "INSERT INTO purchased (product, price, orderID) VALUES ($1,$2,$3)";

    const data = [product, price, orderID];

    pool.query(sql, data, (error, results) => {
        if (error) throw error
        
        res.status(200).json(results.row)
    });
});


 


app.listen(3000, () => {
   console.log("Listening on port 3000");
});
