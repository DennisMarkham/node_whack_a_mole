require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cors());

mongoose.connect(mongoURI);

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
})

app.post("/newScore", function(req, res){
	addScore(req.body);
})

app.get("/showScores", function(req, res){

showScores();

async function showScores(){


const schema = new mongoose.Schema({player: String});

const Scores = mongoose.model("Score", schema);

//let newScores = new Score({player: data.username})

await Scores.find({}).then((data) => res.json(data));
}

})

async function addScore(data){
//okay, using the form element to add score, though, I don't think that will work in the long run
//because we need some way to fetch the time and score variables.  We'll need some kind of script

const schema = new mongoose.Schema({player: String});

const Score = mongoose.model("Score", schema);

let newScore = new Score({player: data.username})

await newScore.save();

}




app.listen(3000);