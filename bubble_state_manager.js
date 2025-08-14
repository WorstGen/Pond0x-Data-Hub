// bubble-state-manager.js

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('cookButton');
  const container = document.getElementById('bubbleContainer');
  const body = document.body;

  // Check state from localStorage
  const state = localStorage.getItem('bubblesEnabled');

  if (state === 'false') {
    bubbleSystem.stop();
    container.classList.add('hidden');
    body.classList.add('glass-off');
    button.classList.add('bubbles-off');
    button.innerHTML = '👨‍🍳 Cook';
  } else {
    bubbleSystem.start();
    container.classList.remove('hidden');
    body.classList.remove('glass-off');
    button.classList.remove('bubbles-off');
    button.innerHTML = '👨‍🍳 Cook';
  }

  // Override toggleBubbles to persist state
  window.toggleBubbles = function () {
    const isRunning = bubbleSystem.animationRunning;

    if (isRunning) {
      bubbleSystem.stop();
      container.classList.add('hidden');
      body.classList.add('glass-off');
      button.classList.add('bubbles-off');
      button.innerHTML = '👨‍🍳 Cook';
      localStorage.setItem('bubblesEnabled', 'false');
    } else {
      bubbleSystem.start();
      container.classList.remove('hidden');
      body.classList.remove('glass-off');
      button.classList.remove('bubbles-off');
      button.innerHTML = '👨‍🍳 Cook';
      localStorage.setItem('bubblesEnabled', 'true');
    }
  };
});
