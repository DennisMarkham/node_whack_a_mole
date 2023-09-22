
//knowing how to beign the game is easy enough, but how do we steop it.  
function beginGame(){

let time = 0;
const timeInterval = setInterval(add2time, 1000);

function add2time()
{
	time += 1;
	$("#timer").text(time);
}

let score = 0;
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


//I'm putting the stoping function inside the beginGame function
function cease_and_eval(){

alert("You scored " + score + " points in " + time + " seconds, or " + (score/time).toFixed(4) + " points per second.")

//THIS IS WHERE YOUR NEW CODE STARvar x = screen.width / 2 - 500 / 2;
        var x = screen.width / 2 - 500 / 2;
        var y = screen.height / 2 - 350 / 2;

window.open("/score.html", "__blank", 'height=385,width=500,left=' + x + ',top=' + y)

//*****


	//this is the ceasing
	console.log("this function is firing")
clearInterval(moleMovingInterval);
clearInterval(timeInterval)
score = 0;
time = 0;
$("img").attr("src", "hole.png");
$("#score").text(score);
$("#timer").text(time);
$("#stop").prop("disabled", true)
$(".begin").prop("disabled", false)
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
