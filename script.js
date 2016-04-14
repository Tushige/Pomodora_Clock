/* TO DO:
 * 1. Progress bar
 */

$(document).ready(function() {
  $("h1").addClass("animated bounce");
  /*================IMPORTANT VARIABLES==================*/
  var wav = 'http://www.oringz.com/oringz-uploads/sounds-882-solemn.mp3';
  var audio = new Audio(wav);
  /* int switcher
   * used to select between "start" and "pause"
   * 1: counting
   * 0: paused
   */
  var switcher = 0;
 /* bool started
  * flag: prevents multiple instances of setInterval()
  */
  var started = false;

 /* bool isWork
  * true: work session in progress
  * false: break session in progess
  */
  var isWork = false;

  /* var timerInterval
   * setInterval() object: called periodically every 1 sec.
   */
  var timerInterval;

 /* switchText
  * text source
  */
  var switchText = ["START", "PAUSE"];
  var timeVal, minutes, seconds;
  /* Important references to objects
   */
  var timerVal = document.getElementById("timer");
  var startBtn = document.getElementById("countdown");
  var up_work = document.getElementById("up-work");
  var up_break = document.getElementById("up-break");
  var down_work = document.getElementById("down-work");
  var down_break = document.getElementById("down-break");
  var work_time = document.getElementById("work-time");
  var break_time = document.getElementById("break-time");

  /*initial value of timer = initial value of work time*/
  timerVal.innerHTML = work_time.innerHTML;

  /*===========KEY Event Handlers==========*/

  /*increase work time*/
  up_work.onclick = function() {
    /* don't modify if countdown active*/
    if(switcher==1) {
      return;
    }
    timerVal.textContent = ++work_time.textContent;
    /*restart*/
    if(started) {
      restart();
      return;
    }
  }
  /*decrease work time*/
  down_work.onclick = function() {
    if(switcher)
      return;
    if(work_time.textContent < 2)
      return;
    timerVal.textContent = --work_time.textContent;
    /*restart*/
    if(started) {
      restart();
      return;
    }
  }
  /*increase break time*/
  up_break.onclick = function() {
    if(switcher)
      return;
    break_time.textContent++;
  }
  /*decrease break time*/
  down_break.onclick = function() {
    if(switcher)
      return;
    if(break_time.textContent < 2)
      return;
    break_time.textContent--;
  }
  /*===============COUNTDOWN FUNCTIONALITY===================*/

 /* START/PAUSE Event Handler
  */
  startBtn.onclick = function(el) {
    //change "start" to "pause" and vice versa
    switcher = 1 - switcher;
    startBtn.textContent = switchText[switcher];
    //setInterval instance already running
    if(started) {
      return;
    }
    startWork();
  }

 /* startWork()
  * Begins work session countdown
  */
  function startWork() {
    isWork = true;
    timerVal.textContent = work_time.textContent;
    runInterval();
  }

 /* workDone()
  * cleanup and start break timer
  */
  function workDone() {
    clearInterval(timerInterval);
    started = false;
    startBreak();
  }

 /* startBreak()
  * sets the timer value to the value of break time
  * and begin countdown
  */
  function startBreak() {
    isWork = false;
    timerVal.textContent = break_time.textContent;
    runInterval();
  }

 /* endBreak()
  * Break ends
  * restart work time countdown
  */
  function breakDone() {
    clearInterval(timerInterval);
    started = false;
    startWork();
  }

 /* restart()
  * restarts the timer with a new timer value
  */
  function restart() {
    clearInterval(timerInterval);
    started = false;
    runInterval();
  }

 /* runInterval()
  * Begins countdown
  */
  function runInterval() {
    /*prevent multiple instances of setInterval*/
    if(started) {
      return;
    }
    //indicate setInterval is runnning
    started = true;
    timeVal = parseInt(timerVal.textContent, 10)*60;
    timerInterval = setInterval(function() {
      //paused: stop counting
      if(switcher==0) {
        return;
      }
      //countdown finished
      if(--timeVal < 0) {
        // Play audio
			  audio.play();
        if(isWork)
          workDone();
        else
          breakDone();
        return;
      }
      //display minute:seconds
      minutes = parseInt(timeVal/60, 10);
      seconds = parseInt(timeVal%60, 10);
      minutes = minutes<10 ? '0' + minutes : minutes;
      seconds = seconds<10 ? '0' + seconds : seconds;
      timerVal.textContent = minutes + ':' + seconds;
    }, 1000);
  }
});
