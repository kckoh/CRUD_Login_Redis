const express = require("express");


const router = express.Router();

const conn = require("../config/config.js")




//route for listing posts
router.get("/:id", (req,res) => {
	if(req.params.id == req.session.user_id){
		conn.query('SELECT * FROM post', function(error, results, fields){	
		  res.render("post_list", {
      		results: results,
			 user: req.session.user_name,
      		 isLoggedIn: req.session.loggedin,
	  		 user_id: req.session.user_id
    });
		})
	}
	
	else {
		res.redirect("/")
	}
})



//get the post session
router.get("/:id/post", (req,res) => {
	if(req.params.id == req.session.user_id){
		res.render("create_post")
	}
	else{
		res.redirect("/")
	}
})



//route for insert post data
router.post("/:id",(req,res) => {
	let data = {
		title: req.body.title,
		content: req.body.content
	};
	
	let sql = "INSERT INTO post SET ?";
	let query = conn.query(sql, data, (err, results) => {
	console.log("Inserted into: ", results);
	if (err) throw err;
	res.redirect("back");
	});
});

module.exports = router;