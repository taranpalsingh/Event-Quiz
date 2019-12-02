const express = require('express');
const mongoose = require('mongoose');

if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

let database = "DoctorsQuiz";

let localURL = "mongodb://localhost:27017/"+database;
let atlasDb = "mongodb+srv://" + process.env.mongoUsername + ":" + process.env.mongoPassword + "@cluster0-gjpjy.mongodb.net/" + database;

console.log(process.env.mongoUsername);

mongoose.connect(atlasDb, {useUnifiedTopology: true, useNewUrlParser: true}, (err)=>{
    if(err) console.log(err)
    else console.log("Connected to MongoDB");
}); 

const userSchema = new mongoose.Schema({
    "name":String,
    // "salutation":String,
    "hospital":String,
    "city":String,
    "phone":Number,
    "email":String,
    "score":Number    
})

const users = mongoose.model("users", userSchema);

const app = express();
app.use(express.json());

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/',(req,res)=>{
    res.send("Welcome to doctors quiz.");
})

app.post('/test',(req,res)=>{
    
    console.log(req.body);
    res.send("Welcome to doctors quiz.");
})

app.get('/users',(req,res)=>{
    users.find({}, (err,data)=>{
        if(err){
            console.log(err);
            res.status(400).send(err)
        }
        res.send(data);
    })
})


app.post('/users',(req,res)=>{
    
    let query = req.body;
    console.log(query);
    query["score"] = null;
    
    users.create(query, (err,data)=>{
        if(err){
            console.log(err);
            res.status(400).send(err)
        }
        res.send(data);
    })
})

app.post('/users/:id/:score',(req,res)=>{
    
    console.log(req.params.id, " , ", req.params.score);
    
    let query = {
        "_id": req.params.id
    }
    users.find(query, (err,data)=>{
        if(err){
            console.log(err);
            res.status(400).send(err);
        }
        if(data.length === 0){           
            console.log("No such user exists");
            res.status(400).send("No such user exists");
        }
        // If the user exists
        else{
            // console.log(data);
            
            users.updateOne(query, {$set: { "score": req.params.score }},(err,data)=>{
                if(err){
                    console.log(err);
                    res.status(400).send(err);
                }
                res.status(200).send(data);
            })
        }
    })
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log(`listening on port ${PORT}`);
})
