
var rcount = 0;
var tcount = 1;
var p1Score = 0;
var p2Score = 0;
var diceArr = new Array(0,0,0,0,0);
var diceFlag = new Array(0,0,0,0,0);
var scoredFlag = 0;
propTurn();

function debug() {
  $("#debug").click(function () {
    console.log("roll count: " + rcount);
    console.log("turn count: " + tcount);
    console.log("current dice: " + diceArr);
    console.log("tmpCounter: " + getTmpCounter());
  });
}

function advanceTurn() {
  scoredFlag=0;
  rcount=0;
  $("#roll").html("Next Turn");
  diceArr = Array(0,0,0,0,0);
  tcount++;
  propTurn();
  for (var i=0;i<=4;i++) {
    diceFlag[i]=0;
    var tmp=i+1;
    $("#d"+tmp).html("*");
    $("#d"+tmp+"Save").html("Save").css("background-color","#036c9e");
  }
} 

function numExists(n) {
  for (var i=0;i<=4;i++) {
    if (diceArr[i]==n) {
      return true;
    }
  }
  return false;
}

function isUsed(x) {
  if (($("#p"+turn).html().search(x)>0)) {
    return true;
  }
  return false;
}

function sumDice(n) {
  var tmpScore=0;
  if (n!=(-1)) {
    for (var i=0;i<=4;i++) {
      if (diceArr[i]==n) {
        tmpScore+=diceArr[i];
      }
    }
  }
  else {
    for (var i=0;i<=4;i++) {
      tmpScore+=diceArr[i];
    }
  }
  return tmpScore;
}

function sendScore(tmpScore, label) {
  if (tcount%2!=0) {
    p1Score+=tmpScore;
    $("#p1").append("<br/>"+label+": " + tmpScore + " | Total: " + p1Score);
  }
  else {
    p2Score+=tmpScore;
    $("#p2").append("<br/>"+label+": " + tmpScore + " | Total: " + p2Score);
  }
  if ((tcount+1)==25) {
    $("*").html("<a href='/yahtzee.html'>Play Again!</a>");
    if (p1Score>p2Score) {
      var winner = "Player 1";
    }
    else {
      var winner = "Player 2";
    }
    alert(winner + ", you win " + p1Score + " - " + p2Score + "! Refresh to play again!");
  }
  scoredFlag = 1;
  advanceTurn();
  updateScoreOptions();
  
}

function getTmpCounter() {
  var tmpCounter = new Array(0,0,0,0,0);
  for (var i=0;i<=4;i++) {
    for (var j=0;j<=4;j++) {
      if (diceArr[i]==diceArr[j]) {
        tmpCounter[i]++;
      }
    }
  }
  return tmpCounter;
}

function findNum(n) {
  for (var i=0;i<=4;i++) {
    if (diceArr[i]==n) {
      return true
    }
  }
}

function propTurn () {
  if (tcount%2==1) {
    $("#p1").css("color","#10e528");
    $("#p2").css("color","white");
    turn=1;
  }
  else {
    $("#p2").css("color","#10e528");
    $("#p1").css("color","white");
    turn=2;
  }
}


function yahtzeeOrNahtzee(n) {
  var tmp = getTmpCounter();
  if ((tmp[0]===5) && (diceArr[0]!==0)) {
    console.log(diceArr);
    return true;
  }
  else {
    return false;
  }
}

function flipFlag(n) {
  var tmp=n+1;
   if (diceFlag[n]==0) {
     diceFlag[n]=1;
     $("#d"+tmp+"Save").html("Saved").css("background-color","green");
   }
   else {
     diceFlag[n]=0;
      $("#d"+tmp+"Save").html("Save").css("background-color","red");
   }
}

function updateScoreOptions() {
  //check for Aces
  if (isUsed("Aces")) {
    $("#aces").fadeOut();
  }
  else {     
    $("#aces").fadeIn();
  }
  
  //check for Twos
  if (isUsed("Twos")) {
    $("#twos").fadeOut();
  }
  else {     
    $("#twos").fadeIn();
  }
  
    //check for Threes
  if (isUsed("Threes")) {
    $("#threes").fadeOut();
  }
  else {     
    $("#threes").fadeIn();
  }
  
    //check for Fours
  if (isUsed("Fours")) {
    $("#fours").fadeOut();
  }
  else {     
    $("#fours").fadeIn();
  }
  
      //check for Fives
  if (isUsed("Fives")) {
    $("#fives").fadeOut();
  }
  else {     
    $("#fives").fadeIn();
  }
  
      //check for Sixes
  if (isUsed("Sixes")) {
    $("#sixes").fadeOut();
  }
  else {     
    $("#sixes").fadeIn();
  }

      //check for Three of Kind
  if (isUsed("3 of a Kind")) {
    $("#tok").fadeOut();
  }
  else {     
    $("#tok").fadeIn();
  }
  
      //check for Four of a Kind
  if (isUsed("4 of a Kind")) {
    $("#fok").fadeOut();
  }
  else {     
    $("#fok").fadeIn();
  }
  
      //check for Full House
  if (isUsed("Full House")) {
    $("#fh").fadeOut();
  }
  else {     
    $("#fh").fadeIn();
  }
  
      //check for Small Straight
  if (isUsed("Small Straight")) {
    $("#sms").fadeOut();
  }
  else {     
    $("#sms").fadeIn();
  }
  
      //check for Large Straight
  if (isUsed("Large Straight")) {
    $("#lgs").fadeOut();
  }
  else {     
    $("#lgs").fadeIn();
  }
  
      //check for Chance
  if (isUsed("Chance")) {
    $("#chance").fadeOut();
  }
  else {     
    $("#chance").fadeIn();
  }
}


async function flag1 () {
  $("#d1Save").click(function () {
    flipFlag(0);
  });
}
async function flag2 () {
  $("#d2Save").click(function () {
    flipFlag(1);
  });
}
async function flag3 () {
  $("#d3Save").click(function () {
    flipFlag(2);
  });
}
async function flag4 () {
  $("#d4Save").click(function () {
    flipFlag(3);
  });
}
async function flag5 () {
  $("#d5Save").click(function () {
    flipFlag(4);
  });
}

function roll() {
  if (rcount==3 && tcount==24) {
    
  }
  else if (rcount==3 && scoredFlag==1) {
    advanceTurn();
  }
  else if (rcount==3 && scoredFlag==0) {
    alert("You haven't scored yet this turn!!");
  }
  else {
    $("#roll").html("Roll");
    for (var i = 0; i<=4; i++) {
      if (diceFlag[i]==0) {
        diceArr[i]=Math.floor(Math.random()*6)+1;
        var tmp=i+1
        $("#d"+tmp).html(diceArr[i]);
      }
    }
    rcount++;
  }
  $("#rcount").html("Roll: " + rcount);
  updateScoreOptions();
}

async function updateScore () {
  $("#aces").click(function () {
    if ($("#p"+turn).html().search("Aces")<0) {
      sendScore(sumDice(1),"Aces");
    }
    else {
      alert("You already used Aces, try something else.")
    }
  });

  $("#twos").click(function () {
    if ($("#p"+turn).html().search("Twos")<0) {
      sendScore(sumDice(2),"Twos");
    }
    else {
      alert("You already used Twos, try something else.")
    }
  });

  $("#threes").click(function () {
    if ($("#p"+turn).html().search("Threes")<0) {
      sendScore(sumDice(3),"Threes");
    }
    else {
      alert("You already used Threes, try something else.")
    }
  });

  $("#fours").click(function () {
    if ($("#p"+turn).html().search("Fours")<0) {
      sendScore(sumDice(4),"Fours");
    }
    else {
      alert("You already used Fours, try something else.")
    }
  });

  $("#fives").click(function () {
    if ($("#p"+turn).html().search("Fives")<0) {
      sendScore(sumDice(5),"Fives");
    }
    else {
      alert("You already used Fives, try something else.")
    }
  });

  $("#sixes").click(function () {
    if ($("#p"+turn).html().search("Sixes")<0) {
      sendScore(sumDice(6),"Sixes");
    }
    else {
      alert("You already used Sixes, try something else.")
    }
  });

  $("#tok").click(function () {
    var tmpScore = 0;
    var tmpCounter = getTmpCounter();
    for (var i=0;i<=4;i++) {
      if (tmpCounter[i]>=3) {
        tmpScore = sumDice(-1);
      }
    }
    if ($("#p"+turn).html().search("3 of a Kind")<0) {
      if (tmpScore!=0) {
        sendScore(sumDice(-1),"3 of a Kind");
      }
      else {
        alert("You do not have 3 of a kind, you get 0 for this turn.")
        sendScore(0, "3 of a Kind");
      }
    }
    else {
      alert("You already used 3 of a Kind, try something else.")
    }
  });

  $("#fok").click(function () {
    var tmpScore = 0;
    var tmpCounter = getTmpCounter();
    for (var i=0;i<=4;i++) {
      if (tmpCounter[i]>=4) {
        for (var i=0;i<=4;i++) {
          tmpScore+=diceArr[i];
        }
      }
    }
    if ($("#p"+turn).html().search("4 of a Kind")<0) {
      if (tmpScore!=0) {
        sendScore(sumDice(-1),"4 of a Kind");
      }
      else {
        alert("You do not have 4 of a kind, you get 0 for this turn.")
        sendScore(0, "4 of a Kind");
      }
    }
    else {
      alert("You already used 4 of a Kind, try something else.")
    }
  });

  $("#fh").click(function () {
    var tmpScore=0;
    var threeFlag = 0;
    var twoFlag = 0;
    var tmpCounter = getTmpCounter();
    console.log(tmpCounter);
    for (var i=0;i<=4;i++) {
      if (tmpCounter[i]==3) {
        threeFlag = 1;
      }
      if (tmpCounter[i]==2) {
        twoFlag = 1;
      }
    }
    if ($("#p"+turn).html().search("Full House")<0) {
      if (twoFlag==1 && threeFlag==1) {
        sendScore(25, "Full House");
      }
      else {
        alert("You don't have a full house, you get 0 for this turn.")
        sendScore(0, "Full House");
      }
    }
    else {
      alert("You already used Full House, try something else.")
    }
  });

  $("#sms").click(function () {
    if ($("#p"+turn).html().search("Small Straight")<0) {
      if ( (findNum(3) && findNum(4) ) && ( ( findNum(1) && findNum(2) ) || ( findNum(5) && findNum(6) ) || ( findNum(3) && findNum(4) ) ) ) {
        sendScore(30, "Small Straight");
      }
      else {
        alert("You don't have a small straight, you get 0 for this turn.");
        sendScore(0, "Small Straight");
      }
    }
    else {
      alert("You already used Small Straight, try something else.");
    }
  });

  $("#lgs").click(function () {
    if ($("#p"+turn).html().search("Large Straight")<0) {
      if (findNum(2) && findNum(3) && findNum(4) && findNum(5) && (findNum(1) || findNum(6))) {
        sendScore(40, "Large Straight");
      }
      else {
        alert("You don't have a Large straight, you get 0 for this turn.");
        sendScore(0, "Large Straight");
      }
    }
    else {
      alert("You already used Large Straight, try something else.");
    }
  });

  $("#yahtzee").click(function () {
    //diceArr = new Array(5,5,5,5,5);
    if ($("#p"+turn).html().search("Y A H T Z E E")<0) {
      if (yahtzeeOrNahtzee()) {
        sendScore(50, "Y A H T Z E E");
      }
      else {
        alert("You do not have a Yahtzee, try something else.");
      }
    }
    else {
      alert("You're clearly cheating but have 100 points anyways.");
      sendScore(100, "Y A H T Z E E");
    }
  });

  $("#chance").click(function () {
    if ($("#p"+turn).html().search("Chance")<0) {
      sendScore(sumDice(-1),"Chance");
    }
    else {
      alert("You already used Chance, try something else.")
    }
  });
}

function funcStart () {
  flag1();
  flag2();
  flag3();
  flag4();
  flag5();
  updateScore();
  propTurn();
  debug();
}
