const express = require("express");


const router = express.Router();

const conn = require("../config/config.js")


//route for listing posts
router.get("/", (req,res) => {
	 res.render("home", {
	  user: req.session.user_name,
      isLoggedIn: req.session.loggedin,
	  user_id: req.session.user_id
    });
})




module.exports = router;