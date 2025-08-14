document.addEventListener('DOMContentLoaded', () => {
  const cookButton = document.getElementById('cookButton');
  const bubbleContainer = document.getElementById('bubbleContainer');
  const body = document.body;

  // Restore saved state from localStorage
  const savedState = localStorage.getItem('bubblesEnabled');
  const shouldEnable = savedState !== 'false';

  // Update UI based on saved state
  if (shouldEnable) {
    bubbleSystem.start?.();
    bubbleContainer.classList.remove('hidden');
    body.classList.remove('glass-off');
    cookButton.classList.remove('bubbles-off');
    cookButton.innerHTML = '👨‍🍳 Cook';
  } else {
    bubbleSystem.stop?.();
    bubbleContainer.classList.add('hidden');
    body.classList.add('glass-off');
    cookButton.classList.add('bubbles-off');
    cookButton.innerHTML = '👨‍🍳 Cook';
  }

  // Override global toggle function to include persistence
  window.toggleBubbles = function () {
    const currentlyRunning = bubbleSystem.animationRunning;

    if (currentlyRunning) {
      bubbleSystem.stop();
      bubbleContainer.classList.add('hidden');
      body.classList.add('glass-off');
      cookButton.classList.add('bubbles-off');
      cookButton.innerHTML = '👨‍🍳 Cook';
      localStorage.setItem('bubblesEnabled', 'false');
    } else {
      bubbleSystem.start();
      bubbleContainer.classList.remove('hidden');
      body.classList.remove('glass-off');
      cookButton.classList.remove('bubbles-off');
      cookButton.innerHTML = '👨‍🍳 Cook';
      localStorage.setItem('bubblesEnabled', 'true');
    }
  };
});
