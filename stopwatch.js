function Stopwatch(timer) {
    let time = 0;
    let prev_time;
    let interval;
    let prev_lap_time = Date.now();
    this.On = false;

    function update() {
        let new_time = Date.now();
        let timePassed = new_time - prev_time;
        prev_time = new_time;
        if (this.On) {
            time += timePassed;
        }
      timer.textContent = formatTime(time);
    }
  
    function formatTime(time) {
      time = new Date(time);
  
      let minutes = time.getMinutes().toString();
      let seconds = time.getSeconds().toString();
      let milliseconds = time.getMilliseconds().toString();
  
      if (minutes.length < 2) {
        minutes = "0" + minutes;
      }
      if (seconds.length < 2) {
        seconds = "0" + seconds;
      }
      if (milliseconds.length < 2) {
        milliseconds = "0" + milliseconds;
      }
      else if (milliseconds.length > 2) {
        milliseconds = milliseconds.slice(0,2);
      }
      let formattedTime = `${minutes} : ${seconds} . ${milliseconds}`;
      return formattedTime;
    }
  
    this.start = function() {
      interval = setInterval(update.bind(this), 10);
      prev_time = Date.now();
      this.On = true;
    };
  
    this.stop = function() {
      clearInterval(interval);
      interval = null;
      this.On = false;
    };
  
    this.getLapTime = function() {
        let new_time = Date.now();
        let lap_time = new_time - prev_lap_time;
        prev_lap_time = new_time
        lap_time = formatTime(lap_time);
        return lap_time;
    };
  }

let timer = document.getElementById('timer');
let toggleBtn = document.getElementById('toggle');
let lapBtn = document.getElementById('lap');
let lapsList = document.getElementById('lap_times');

let stopwatch = new Stopwatch(timer);

function start() {
  toggleBtn.textContent = 'Stop';
  stopwatch.start();
}

function stop() {
  toggleBtn.textContent = 'Start';
  stopwatch.stop();
}

toggleBtn.addEventListener('click', function() {
  stopwatch.On ? stop() : start();
});

lapBtn.addEventListener('click', function() {
  if (stopwatch.On) {
    let lap_time = stopwatch.getLapTime();
    let list_item = document.createElement("li");
    list_item.appendChild(document.createTextNode(lap_time));
    lapsList.appendChild(list_item);
  }
});