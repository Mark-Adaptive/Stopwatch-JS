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
  
    function formatTime(inputTime) {
      const time = new Date(inputTime);
  
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const seconds = time.getSeconds().toString().padStart(2, '0');
      const centis = Math.round(time.getMilliseconds() /10).toString().padStart(2, '0');

      return `${minutes} : ${seconds} . ${centis}`;
    }
  
    this.start = function() {
      interval = setInterval(update.bind(this), 10);
      prev_time = Date.now();
      this.On = true;
    };
  
    this.stop = function() {
      this.On = false;
      clearInterval(interval);
      interval = null;
    };
  
    this.getLapTime = function() {
      if (prev_lap_time === null){
        prev_lap_time = time;
      }
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