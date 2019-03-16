var express = require('express')
var app = express()
var exphbs = require('express-handlebars');
var app = express();
var bodyParser = require("body-parser");


var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engin", "handlebars");

var routes = require("./controllers/burgers_controller.js");
app.use(routes);

app.listen(PORT, function() {
  console.log("Server listening on http//localhost:"+ PORT);
});

