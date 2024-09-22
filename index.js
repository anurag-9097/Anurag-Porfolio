const express = require("express");
const app = express();
const mysql = require("mysql2");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"/images")));

app.use(express.urlencoded({extended: true}));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "portfolio",
    password:"9097456901"
})

app.get("/",(req, res) =>{
    res.render("index.ejs");
})

app.get("/aboutme", (req,res) =>{
    res.render("aboutme.ejs");
})

app.get("/skills", (req,res) =>{
    res.render("skills.ejs");
})

app.get("/projects",(req, res) =>{
    res.render("projects.ejs");
})

app.get("/contact",(req,res) =>{
    res.render("contact.ejs");
})

app.post("/contact",(req, res) =>{
    let{name, email} = req.body;
    let q = 'INSERT INTO enquire(name,email) values(?,?)';
    let enquire = [`${name}`,`${email}`];

    try{
        connection.query(q,enquire,(err, result) =>{
            if(err) throw err;
            res.redirect("/");
            console.log(result);
        })
    } catch(err){
        console.log(err);
        res.send(err);
    }
})

app.listen("8080",()=>{
    console.log("port listen on 8080");
})