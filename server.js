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

const schema = new mongoose.Schema({
	player: String,
	score: Number,
	time: Number,
	sps: Number
});

const Scores = mongoose.model("Score", schema);

app.get("/showScores", function(req, res){

showScores();

async function showScores(){

//let newScores = new Score({player: data.username})

await Scores.find({}).sort({_id: -1}).limit(5).then((data) => res.json(data));
}

})

async function addScore(data){

//this isn't firing any more. What?
console.log("function firing");

let newScore = new Scores({
	player: data.playerName,
	score: data.score,
	time: data.time,
	sps: (data.score/data.time).toFixed(2)
							})

await newScore.save();

}




app.listen(3000);