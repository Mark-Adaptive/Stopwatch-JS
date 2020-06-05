function Stopwatch(timer) {
    let time = 0;
    let prev_time;
    let interval;
    let prev_lap_time = Date.now();
    this.longest_lap = null;
    this.shortest_lap = null;
    this.On = false;
  
    this.formatTime = function(inputTime) {
      const time = new Date(inputTime);
  
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const seconds = time.getSeconds().toString().padStart(2, '0');
      const centis = Math.round(time.getMilliseconds() /10).toString().padStart(2, '0');

      return `${minutes} : ${seconds} . ${centis}`;
    }

    function formatTime(inputTime){
      const time = new Date(inputTime);
  
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const seconds = time.getSeconds().toString().padStart(2, '0');
      const centis = Math.round(time.getMilliseconds() /10).toString().padStart(2, '0');

      return `${minutes} : ${seconds} . ${centis}`;
    }

    function update() {
      let new_time = Date.now();
      let timePassed = new_time - prev_time;
      prev_time = new_time;
      if (this.On) {
          time += timePassed;
      }
    timer.textContent = formatTime(time);
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
    let list_item = document.createElement('li');
    let formatted_lap_time = stopwatch.formatTime(lap_time);
    list_item.appendChild(document.createTextNode(formatted_lap_time));
    let items = lapsList.getElementsByTagName('li');
    if (stopwatch.shortest_lap !== null) {
      if (lap_time <= stopwatch.shortest_lap) {
        stopwatch.shortest_lap = lap_time;
      }
      else if (lap_time >= stopwatch.longest_lap) {
        stopwatch.longest_lap = lap_time;
    }
    for (let i = 0; i < items.length; i++) {
      if (items[i].textContent == stopwatch.longest_lap) {
        items[i].style.color = 'red';
      }
      else if (items[i].textContent == stopwatch.shortest_lap) {
        items[i].style.color = 'green';
      }
      else {
        items[i].style.color = 'black';
        }
      }
    }
    else {
      stopwatch.shortest_lap = lap_time;
      stopwatch.longest_lap = lap_time;
      }
      lapsList.appendChild(list_item);
    }
  else {
    let items = lapsList.getElementsByTagName('li');
    while(items.length > 0) {
      lapsList.removeChild(items[0]);
    }
    stopwatch.reset();
  }
});