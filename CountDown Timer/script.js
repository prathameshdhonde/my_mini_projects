const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const timerDisplay = document.getElementById('timerDisplay');
let countdown;

startBtn.addEventListener('click', () => {
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;
  let totalTime = minutes * 60 + seconds;

  //  REset
  clearInterval(countdown);

  updateDisplay(totalTime);

  countdown = setInterval(() => {
    totalTime--;

    if (totalTime <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = "00:00";
      alert("Time's up!");
    } else {
      updateDisplay(totalTime);
    }
  }, 1000);
});

resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  document.getElementById('minutes').value = '';
  document.getElementById('seconds').value = '';
  timerDisplay.textContent = "00:00";
});

function updateDisplay(totalSeconds) {
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  timerDisplay.textContent = `${mins}:${secs}`;
}