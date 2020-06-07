function Stopwatch(timer) {
    let time = 0;
    let prevTime;
    let interval;
    let prevLapTime = null;
    this.longestLap = null;
    this.shortestLap = null;
    this.On = false;
  
    function update() {
      let new_time = Date.now();
      let timePassed = new_time - prevTime;
      prevTime = new_time;
      if (this.On) {
          time += timePassed;
      }
    timer.textContent = formatTime(time);
  }
  
    this.start = function() {
      interval = setInterval(update.bind(this), 10);
      prevTime = Date.now();
      prevLapTime = Date.now();
      this.On = true;
    };
  
    this.stop = function() {
      this.On = false;
      clearInterval(interval);
      interval = null;
    };
  
    this.getLapTime = function() {
      if (prevLapTime === null){
        prevLapTime = time;
      }
        let new_time = Date.now();
        let lapTime = new_time - prevLapTime;
        prevLapTime = new_time
        return lapTime;
    };

    this.reset = function() {
      time = 0;
      this.longestLap = null;
      this.shortestLap = null;

      update();
    }
  };

let timer = document.getElementById('timer');
let toggleBtn = document.getElementById('toggle');
let lapBtn = document.getElementById('lap');
let lapsList = document.getElementById('lapTimes');

let stopwatch = new Stopwatch(timer);

function start() {
  toggleBtn.textContent = 'Stop';
  lapBtn.textContent = 'Lap';
  toggleBtn.className = 'btn btn-danger';
  lapBtn.className = 'btn btn-primary';
  stopwatch.start();
}

function stop() {
  toggleBtn.textContent = 'Start';
  lapBtn.textContent = 'Reset';
  toggleBtn.className = 'btn btn-success';
  lapBtn.className = 'btn btn-warning';
  stopwatch.stop();
}

function setLaps(lapTime) {
  if (stopwatch.shortestLap !== null) {
    if (lapTime <= stopwatch.shortestLap) {
            stopwatch.shortestLap = lapTime;
    }
    else if (lapTime >= stopwatch.longestLap) {
      stopwatch.longestLap = lapTime;
    }
  }
  else {
    stopwatch.shortestLap = lapTime;
    stopwatch.longestLap = lapTime;
    }
}

function formatTime(inputTime){
  const time = new Date(inputTime);
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const centis = Math.round(time.getMilliseconds() /10).toString().padStart(2, '0');

  return `${minutes} : ${seconds} . ${centis}`;
}
toggleBtn.addEventListener('click', function() {
  stopwatch.On ? stop() : start();
});

lapBtn.addEventListener('click', function() {
  
  if (stopwatch.On) {
    let lapTime = stopwatch.getLapTime();
    let list_item = document.createElement('li');
    list_item.appendChild(document.createTextNode(formatTime(lapTime)));
    lapsList.appendChild(list_item);
    const items = lapsList.getElementsByTagName('li');
    setLaps(lapTime);
    if (items.length > 1) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].textContent == formatTime(stopwatch.longestLap)) {
          items[i].style.color = 'red';
        }
        else if (items[i].textContent == formatTime(stopwatch.shortestLap)) {
          items[i].style.color = 'green';
        }
        else {
          items[i].style.color = 'white';
          }
      }
    }
  } else {
    const items = lapsList.getElementsByTagName('li');
    while(items.length > 0) {
      lapsList.removeChild(items[0]);
    }
    stopwatch.reset();
  }
});