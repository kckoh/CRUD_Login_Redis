const express = require("express");


const router = express.Router();

const conn = require("../config/config.js")


//route for insert register data
router.post("/",(req,res) => {
	let data = {
		user_name: req.body.user_name,
		user_email: req.body.user_email,
		user_password: req.body.user_password
	};
	let sql = "INSERT INTO account SET ?";
  	let query = conn.query(sql, data, (err, results) => {
    	console.log("Inserted into: ", results);
    	if (err) throw err;
    		res.redirect("/");
  	});
	
});



// route for register
router.get("/", (req, res) => {
	 res.render("register", {
	  user: req.session.user_name,
      isLoggedIn: req.session.loggedin,
	  user_id: req.session.user_id
    });
});




module.exports = router;