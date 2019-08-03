const express = require("express");


const router = express.Router();

const conn = require("../config/config.js")



//route for insert production data
router.post("/save", (req, res) => {
  let data = {
    product_name: req.body.product_name,
    product_price: req.body.product_price
  };
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/product");
  });
});


//route for product
router.get("/", (req, res) => {

  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render("product_view", {
      results: results,
	  user: req.session.user_name,
      isLoggedIn: req.session.loggedin,
	  user_id: req.session.user_id
    });
  });
});



//route for update data
router.post("/update", (req, res) => {
  let sql =
    "UPDATE product SET product_name='" +
    req.body.product_name +
    "', product_price='" +
    req.body.product_price +
    "' WHERE product_id=" +
    req.body.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Updated: ", results);
    res.redirect("/product");
  });
});


//route for delete data
router.post("/delete", (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=" + req.body.product_id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Deleted: ", results);
    res.redirect("/product");
  });
});


module.exports = router;
