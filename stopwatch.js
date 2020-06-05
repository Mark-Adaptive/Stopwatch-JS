function Stopwatch(timer) {
    let time = 0;
    let prev_time;
    let interval;
    let prev_lap_time = Date.now();
    this.longest_lap = null;
    this.shortest_lap = null;
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
  
    this.formatTime = function(inputTime) {
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
        return lap_time;
    };

    this.reset = function() {
      time = 0;
      update();
    }
  }

let timer = document.getElementById('timer');
let toggleBtn = document.getElementById('toggle');
let lapBtn = document.getElementById('lap');
let lapsList = document.getElementById('lap_times');

let stopwatch = new Stopwatch(timer);

function start() {
  toggleBtn.textContent = 'Stop';
  lapBtn.textContent = 'Lap';
  stopwatch.start();
}

function stop() {
  toggleBtn.textContent = 'Start';
  lapBtn.textContent = 'Reset';
  stopwatch.stop();
}

toggleBtn.addEventListener('click', function() {
  stopwatch.On ? stop() : start();
});

lapBtn.addEventListener('click', function() {
  if (stopwatch.On) {
    let lap_time = stopwatch.getLapTime();
    let list_item = document.createElement("li");
    let formatted_lap_time = stopwatch.formatTime(lap_time);
    list_item.appendChild(document.createTextNode(formated_lap_time));
    if (stopwatch.shortest_lap !== null) {
      if (lap_time <= shortest_lap) {
        stopwatch.shortest_lap = lap_time;
        list_item.textContent.fontcolor = 'red';
      }
    }
    else {
      stopwatch.shortest_lap = lap_time;
      stopwath.longest_lap = lap_time;
    }
    if (lap_time >= longest_lap) {
      stopwatch.longest_lap = lap_time;
      list_item.textContent.fontcolor = 'green';
    }
    lapsList.appendChild(list_item);
  }
  else {
    stopwatch.reset();
  }
});