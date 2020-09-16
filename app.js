const express = require("express");
const bodyParser =require("body-parser");   //requiring all files
const request =require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));       //for picking up static files we have this special feautre of express
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");        //to get the signup page on root of our server
});

app.post("/" , function(req,res){

const firstName =req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data ={
  members : [
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME : firstName,
        LNAME : lastName
      }
    }
  ]
};

var jsonData = JSON.stringify(data);

const url ="https://us2.api.mailchimp.com/3.0/lists/********"   //list no.

const options ={
  method: "POST",
  auth: "ayush3911:*****************"      //key
}

 const request = https.request(url, options ,function(response){

if(response.statusCode ===200){
  res.sendFile(__dirname + "/success.html")
}else{
  res.sendFile(__dirname + "/failure.html")
}


response.on("data", function(data){
  console.log(JSON.parse(data));
})

})

request.write(jsonData);
request.end();

});

app.post("/failure", function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 5000 ,function(){    //creating host on port 5000
  console.log("Server started on port 5000");
});
