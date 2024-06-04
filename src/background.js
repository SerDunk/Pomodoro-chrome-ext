let timer = null;
let timeLeft = 0;
let isResting = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_TIMER") {
    timeLeft = message.time;
    isResting = message.isResting;
    startTimer();
  } else if (message.type === "PAUSE_TIMER") {
    clearInterval(timer);
  } else if (message.type === "RESUME_TIMER") {
    startTimer();
  } else if (message.type === "RESET_TIMER") {
    clearInterval(timer);
    timeLeft = 0;
  }
  sendResponse({ status: "ok" });
});

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      chrome.storage.local.set({ timeLeft, isResting });
    } else {
      clearInterval(timer);
      if (isResting) {
        sendNotification("Time to get back", "Start timer again");
      } else {
        sendNotification("Break Time", "You earned it");
      }
      isResting = !isResting;
      chrome.runtime.sendMessage({
        type: "SWITCH_MODE",
        isResting,
        time: isResting ? 5 * 60 : 25 * 60,
      });
    }
  }, 1000);
}

function sendNotification(title, message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: title,
    message: message,
  });
}
