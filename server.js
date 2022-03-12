var express = require("express");
var bodyparser = require("body-parser");
var cookieparser = require("cookie-parser");
var multer = require("multer"); 
const User = require("./models/User");
var Task = require("./models/Task");

var app = express();
app.use(express.static("public"));
app.use(express.static("pages"));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(__dirname +"/pages/login.html");
});

// app.get("/register", function(req, res){
//     res.sendFile(__dirname +"/pages/registration.html");
// });

app.get("/user", function(req, res){
    res.sendFile(__dirname +"/pages/user.html");
});

app.get("/user", function(req, res){
    res.sendFile(__dirname +"/pages/style.css");
});


app.post("/register", async(req, res)=>{
    let body = req.body;
    var user = new User.User();
    user.id = 0;
    user.name = body.data.name;
    user.email = body.data.email;
    user.password = body.data.password;

    user.register().then(result => {
        console.log("Result")
        console.log(result);
        let data = {
            "data":{
                "id":result.insertId,
                "status":"success"
            }
        };
        res.end(JSON.stringify(data));
     },
     err =>{
         console.log("Error: " + err);
        let data = {
            "data":{
                "status":"fail"
            }
        };
        res.end(JSON.stringify(data));
    });    
});

app.post("/login", async(req,res)=>{
    let body = req.body;
    var user = new User.User();
    user.email = body.data.email;
    user.password = body.data.password;

    user.login().then(result => {
        console.log("Result")
        console.log(result);
        let data = {
            "status" : "Fail"
        }
        if(result.length != 0)
        {
            data = {
                "status" : "success",
                "data" : result
            }
        }
        res.end(JSON.stringify(data));
     },
     err =>{
        let data = {        
                "status":"fail"
            }       
        res.end(JSON.stringify(data));
    });    
});

app.post("/savetask", async(req, res)=>{
    let body = req.body;
    var task = new Task.Task();
    // user.id = 0;
    task.id = body.data.id;
    task.user_id = body.data.user_id;
    task.tdate = body.data.tdate;
    task.ttime = body.data.ttime;
    task.task = body.data.task;
    task.status = body.data.status;

    task.save().then(result => {
        let data = {
            "status" : "success",
            "data" : result
        }
        res.end(JSON.stringify(data));
     },
     err =>{
         
        let data = {
            "data":{
                "status":"fail"
            }
        };
        res.end(JSON.stringify(data));
        console.log(err);
    });    
});

app.post("/deletetask", async(req, res)=>{
    let body = req.body;
    var task = new Task.Task();
    // user.id = 0;
    task.id = body.data.id;
    
    task.delete().then(result => {
        let data = {
            "status" : "success",
            "data" : result
        }
        res.end(JSON.stringify(data));
     },
     err =>{
         
        let data = {
            "data":{
                "status":"fail"
            }
        };
        res.end(JSON.stringify(data));
        console.log(err);
    });    
});

app.post("/gettask", async(req, res)=>{
    let body = req.body;
    var task = new Task.Task();
    // user.id = 0;
    task.id = body.data.id;
    task.user_id = body.data.user_id;
    task.tdate = body.data.tdate;
    task.ttime = body.data.ttime;
    task.task = body.data.task;
    task.status = body.data.status;

    task.get().then(result => {
        let data = {
            "status" : "success",
            "data" : result
        }
        res.end(JSON.stringify(data));
     },
     err =>{
         
        let data = {
            "data":{
                "status":"fail"
            }
        };
        res.end(JSON.stringify(data));
        console.log(err);
    });    
});


app.post("/changetask", async(req, res)=>{
    let body = req.body;
    var task = new Task.Task();
    // user.id = 0;
    task.id = body.data.id;
    task.status = body.data.status;

    task.change().then(result => {
        let data = {
            "status" : "success",
            "data" : result
        }
        res.end(JSON.stringify(data));
     },
     err =>{
         
        let data = {
            "data":{
                "status":"fail"
            }
        };
        res.end(JSON.stringify(data));
        console.log(err);
    });    
});

app.post("/listtask", async(req, res)=>{
    let body = req.body;
    var task = new Task.Task();
    // user.id = 0;
    task.id = body.data.id;
    task.user_id = body.data.user_id;
    task.tdate = body.data.tdate;
    task.ttime = body.data.ttime;
    task.task = body.data.task;
    task.status = body.data.status;

    task.list().then(result => {
        let data = {
            "status" : "success",
            "data" : result
        }
        res.end(JSON.stringify(data));
     },
     err =>{
         
        let data = {
            "data":{
                "status":"fail"
            }
        };
        res.end(JSON.stringify(data));
        console.log(err);
    });    
});

app.listen(8000, function(){
    console.log("started");
});