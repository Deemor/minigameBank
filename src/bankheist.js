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
  [1],
  [1],[2],[3],[4],[5],[3,3],[7],[4,4],[5,4],[5,5],//10
  [6,5],[6,6],[7,6],[7,7],[6,5,4],[6,5,5],[6,6,5],[6,6,6],[7,6,6],[7,7,6],//20
  [7,7,7],//21
]

$("#startButton").on( "click", function() {
  start();
});

async function start(){
  var attempt_amount = $("#attempts").val();
  hideCorrectAnswerButton();
  hideSettings();
  hideGame();
  setTerminalText('Laczenie z terminalem...')
  await delay(1.0)
  setTerminalText('Inicjowanie programu 5U5_1MP...')
  await delay(1.5)
  hideTerminal();
  var result = true;
  var answer;
  for(var i=0;i<attempt_amount;i++)
  {
    answer = await startHack();
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
    //ZAPISANIE DANYCH DO MODAL Z PODSUMOWANIEM
    $('#modalAnswer').html(String(answer[0] == true ? answer[1].toUpperCase() : "BRAK"));
    //
    var restartButton = '<button type="button" class="btn btn-primary btn-lg" id="restartButton">Failed. Try again</button>';
  }
  await delay(1.5);
  
  $('#terminalText').empty().append(restartButton);
  showSettings();
  if(!result)
    showCorrectAnswerButton();
  $("#restartButton").on( "click", function() {
    start();
  });
}
async function startHack(){
  showGame();
  hideMenu();
  $("#answer").val("");
  var time = $("#time").val();
  var tileAmount = $("#amount").val();
  var tab = [];
  var q_amount = $("#question").val();
  var shrinking_time = $("#shrinking").val();

  for(var i=0;i<tileAmount;i++)
  {
    tab.push([i+1,createTile(tileAmount)]);
  }
  tab = shuffleArray(tab);
  createTiles(tab,tileAmount);
  //zmiana rozmiaru kafelka (animacja zmniejszania sie kafelkow)
  await displayTilesShrinking(tileAmount,shrinking_time);
  showMenu();
  $("#answer").focus();
  var questionAndAnswer = createQuestion(tileAmount,q_amount,tab);
  //ZAPISANIE DANYCH DO MODAL Z PODSUMOWANIEM
  var modalSequence = "";
  {
    var z = 0;
    for(var i = 0; i < ARRANGEMENT[tileAmount].length;i++)
    {
      for(var j = 0; j < ARRANGEMENT[tileAmount][i];j++)
      {
        modalSequence += " "+ String(tab[z][0]);
        z++;
      }
      modalSequence += "<br/>";
    }
  }
  $("#modalSequence").html(modalSequence);
  $("#modalHint").html(questionAndAnswer[0].toUpperCase());
  $("#modalCorrectAnswer").html(questionAndAnswer[1].toUpperCase());
  // 
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
function showCorrectAnswerButton()
{
  $("#correctAnswerButton").show();
}
function hideCorrectAnswerButton()
{
  $("#correctAnswerButton").hide();
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
  await delay(1.5)
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
  $("#modalTiles").html($("#tileContainer").html());
}