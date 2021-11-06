import { createTile,createQuestion } from './tile.js'
import { createTiles } from './tilesCreator.js'
import { getTileSVG } from './SVGCreator.js'

const delay = t => new Promise(res => setTimeout(res, t * 1000));
const shuffleArray = (array) => array.map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort).map((a) => a.value)

function playSound(name, volume){
    const sound = new Audio(name)
    sound.volume = volume || 0.15;
    sound.play();     
    return sound
}
const ARRANGEMENT =
[
  [1,1],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],
  [1,7],[1,8],[2,5],[2,5],[2,6],[2,6],[2,7],
  [2,7],[2,8],[2,8],[3,6],[3,6],[3,7],[3,7],
  [3,8],[3,8],[4,7],[4,7],[4,8],[4,8],[4,8],
  [4,8],[4,8],[4,8],[4,8],[4,8]
]


$("#startButton").on( "click", function() {
  start();
});


async function start(){
  hideSettings();
  hideGame();
  setTerminalText('Laczenie z terminalem...')
  await delay(1.0)
  setTerminalText('Inicjowanie programu 5U5_1MP...')
  await delay(1.5)
  hideTerminal();
  var result = true;
  for(var i=0;i<3;i++)
  {
    var answer = await startHack();
    if(answer[0]==true)
    {
      console.log("your answer:" + answer[1]);
      if(answer[1].toLowerCase()!=answer[2].toLowerCase())
      {
        result = false;
        break;
      }
    }else
    {
      result = false;
      break;
    }
  }
  hideGame();
  showTerminal();
  if(result)
  {
    setTerminalText('CONNECTION SUCCESSFUL');
    var restartButton = '<button type="button" class="btn btn-primary btn-lg" id="restartButton">Success. Try again</button>';
  }
  else
  {
    setTerminalText('CONNECTION FAILED');
    var restartButton = '<button type="button" class="btn btn-primary btn-lg" id="restartButton">Failed. Try again</button>';
  }
      await delay(1.5);
  
  $('#terminalText').empty().append(restartButton);
  showSettings();
  $("#restartButton").on( "click", function() {
    start();
  });
}
async function startHack()
{
  showGame();
  hideMenu();
  $("#answer").val("");
  var time = $("#time").val();
  var tileAmount = $("#amount").val();
  var tab = [];
  var q_amount = $("#question").val();
  var shrinking_time = $("#shrinking").val();
  var inARow = ARRANGEMENT[tileAmount][1]//$("#inARow").val();
  var sizeOfTile = 1.0;//parseFloat($("#tileSize").val());
  //kolejny input SIZE pamietaj odkomentowac w index.html
  // if(sizeOfTile==1.0)
  // sizeOfTile = 0.8;
  // else if(sizeOfTile==2.0)
  // sizeOfTile = 0.9;
  // else if(sizeOfTile==3.0)
  // sizeOfTile = 1.0;
  //jesli nie ma input SIZE
  
  if(inARow>7)
    sizeOfTile=0.9;
    if(inARow>8)
    sizeOfTile=0.8;
  //
  var boxCss =`<style>.boxHack{width:`+String(parseInt(220*sizeOfTile))+`px; height:`+String(parseInt(220*sizeOfTile))+`px;} </style>`;
  $('head').append(boxCss);
    for(var i=0;i<tileAmount;i++)
    {
      tab.push([i+1,createTile(tileAmount)]);
    }
    tab = shuffleArray(tab);
    createTiles(tab,tileAmount,inARow);
    //zmiana rozmiaru kafelka
  await displayTilesShrinking(tileAmount,shrinking_time);
  showMenu();
  $("#answer").focus();
  var questionAndAnswer = createQuestion(tileAmount,q_amount,tab);
  $("#hint").html(questionAndAnswer[0].toUpperCase());
  console.log(questionAndAnswer);//pytanie oraz odpowiedz na konsoli:)
  await displayTilesSVG(tileAmount,tab);

  const timer_sound = (time <= 7) ? playSound('audio/timer_sound.mp3') : playSound('audio/timer_sound_long.mp3');
  var progBar = $("#progress-bar");
  progBar.css("width","100%");
  progBar.animate({
    width: "0px"
  }, {
    duration: time*1000,
    ease: "linear",
  });

  return new Promise(async (output) => {

    $("#answer").on("keyup", (event) => {
        if (event.keyCode === 13) {
            $("#progress-bar").stop(true,true);
            timer_sound.pause()
            output([true, $("#answer").val(),questionAndAnswer[1]]);
        }
    });

    await delay(time)
    timer_sound.pause()
    output([false]);
  });

}
function setTerminalText(text)
{
  $("#terminalText").html(text);
}
function hideTerminal()
{
  $("#terminal").hide();
  $("#terminalText").hide();
}
function showTerminal()
{
  $("#terminal").show();
  $("#terminalText").show();
}
function hideGame()
{
  $("#game").hide();
}
function showGame()
{
  $("#game").show();
}
function hideMenu()
{
  $("#menu").hide();
}
function showMenu()
{
  $("#menu").show();
}
function hideSettings()
{
  $("#settings").hide();
}
function showSettings()
{
  $("#settings").show();
}
async function displayTilesShrinking(amount, shrinking_time){
    
  for(var i=0;i<amount;i++)
  {
    $("#b"+String(i+1)).innerHTML = `<div class="container g-0 h-100 w-100">`+
    `<p class="d-flex h-100 align-items-center justify-content-center font-weight-bold boxHackTextLoading">`+ String(i+1) +`</p>`+
    `</div>`;
  }
  await delay(shrinking_time)
  for(var i=0;i<amount;i++)
  {
    $("#b"+String(i+1)).children().css(
      {
        "transform":"scale(0)",
        "transition": "all " + String(shrinking_time*1000) + "ms linear"
      }
    )
  }
  await delay(shrinking_time)
  for(var i=0;i<amount;i++)
  {
    $("#b"+String(i+1)).children().remove()
  }
}
async function displayTilesSVG(amount, tab){
  for(var i=0;i<amount;i++)
  {
    $("#b"+String(i+1)).html(getTileSVG(tab[i][1]));
  }
}