const express = require("express");


const router = express.Router();

const conn = require("../config/config.js")


//route for login page
router.get("/", (req,res) => {
	res.render("login");
	
});



router.get("/logout", (req,res) => {
	req.session.destroy();
	res.redirect("/");
});


//route for loggedin
router.post('/', function(request, response) {
		let user_email = request.body.user_email;
		let user_password = request.body.user_password;
	if (user_email && user_password) {
		conn.query('SELECT * FROM account WHERE user_email = ? AND user_password = ?', [user_email, user_password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.user_email = user_email;
				request.session.user_name = results[0].user_name;
				request.session.user_id = results[0].user_id;
				response.redirect("/");
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


module.exports = router;