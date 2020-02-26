var bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	express = require("express"),
	app = express();


// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONGIG
var blogSchema = new mongoose.Schema({
	title   : String,
	image	: String,
	body	: String,
	created	: {type: Date, default: Date.now}
})
var Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
// 	title: "Test Blog",
// 	image: "https://images.unsplash.com/photo-1513754537542-f85cde07305a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
// 	body: "This is a blog post!!!"
// })

// RESTFUL ROUTES
app.get("/", function(req, res){
	res.redirect("/blogs")
})

// INDEX ROUTE
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.Blog(err)
		} else {
			res.render("index", {blogs: blogs});
		}
	})
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
	res.render("new")
})

// CREATE ROUTE
app.post("/blogs", function(req, res){
	//create blogs
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
			res.redirect("/blogs")
		}
	})
})

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog})
		}
	})
})


app.listen(5000, function(){
	console.log("Server is running!!!")
})