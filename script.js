 
let time = 0;
let score = 0;

function beginGame(){

	function add2time()
{
	time += 1;
	$("#timer").text(time);
}

const timeInterval = setInterval(add2time, 1000);



const hit = new Audio("hit.flac");
const miss = new Audio("miss.mp3");
$(".begin").prop("disabled", true);
$("#stop").prop("disabled", false);

function moveMole(){	
let moleSpot = Math.floor(Math.random() * 9) + 1;


//needs to be 10, otherwise mole gets stuck in last hole
//this basically wipes the slate clean before placing a mole, so there won't be more than one on the screen a a time.
for (let i = 1; i < 10; i++) {
  document.getElementById("im" + i).setAttribute("src", "hole.png");
  
}

//this places the mole in a new spot
document.getElementById("im" + moleSpot).setAttribute("src", "mole.png");

}

const moleMovingInterval = setInterval(moveMole, 1000);


//I'm putting the stoping function inside the beginGame function.  Otherwise it doesn't recognize
//the intervals.
function cease_and_eval(){



	//this is the ceasing
	console.log("this function is firing")
clearInterval(moleMovingInterval);
clearInterval(timeInterval)

//now, before the everything resets, it somehow needs to ask the player for a username, and pass
//score and time data in somme sort of function.

let newPlayer = prompt("You scored" + score + " points in " + time + " seconds, or " + (score/time).toFixed(2) + " points per second." +  
	"Enter your name if you would like to post your score.")

console.log(newPlayer);

let scoreData = 
{
playerName: newPlayer,
score: score,
time: time
}

if (newPlayer != null){
	$.post("/newScore", scoreData)
}

score = 0;
time = 0;

//I'm replacing all that which is below with a simple location.reload, this way the scores
//list will be updated

// $("img").attr("src", "hole.png");
// $("#score").text(score);
// $("#timer").text(time);
// $("#stop").prop("disabled", true)
// $(".begin").prop("disabled", false)

location.reload();
}

//having the event listener for the stop function spawned here
$("#stop").click(function(){
cease_and_eval()
});

$("img").click(function()
{
	
	
	if($(this).attr("src") == "mole.png")
	{
		hit.pause();
		hit.currentTime = 0;
		hit.volume = 0.3;
		hit.play();
		
	$(this).attr("src", "whacked.png");
	score++;
	$("#score").text(score);	
	}
	else
	{
		miss.pause();
		miss.currentTime = 0;
		miss.play()
	}
})


}
