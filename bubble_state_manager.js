// Persistent Bubble State Manager
// Add this script to each page that has the cook button

(function() {
  'use strict';
  
  // State management
  const BUBBLE_STATE_KEY = 'pond0x_bubble_state';
  
  // Get stored state (default to 'on' if not set)
  function getBubbleState() {
    const stored = localStorage.getItem(BUBBLE_STATE_KEY);
    return stored === 'off' ? false : true; // Default to true (bubbles on)
  }
  
  // Save state to localStorage
  function saveBubbleState(isOn) {
    localStorage.setItem(BUBBLE_STATE_KEY, isOn ? 'on' : 'off');
  }
  
  // Apply the stored state on page load
  function applyStoredBubbleState() {
    const shouldShowBubbles = getBubbleState();
    const container = document.getElementById('bubbleContainer');
    const button = document.getElementById('cookButton');
    const body = document.body;
    
    if (!shouldShowBubbles) {
      // Apply "off" state
      if (window.bubbleSystem && bubbleSystem.animationRunning) {
        bubbleSystem.stop();
      }
      if (container) container.classList.add('hidden');
      if (body) body.classList.add('glass-off');
      if (button) {
        button.classList.add('bubbles-off');
        button.innerHTML = '👨‍🍳 Cook';
      }
    } else {
      // Apply "on" state (default)
      if (window.bubbleSystem && !bubbleSystem.animationRunning) {
        bubbleSystem.start();
      }
      if (container) container.classList.remove('hidden');
      if (body) body.classList.remove('glass-off');
      if (button) {
        button.classList.remove('bubbles-off');
        button.innerHTML = '👨‍🍳 Cook';
      }
    }
  }
  
  // Enhanced toggle function that saves state
  window.toggleBubbles = function() {
    const container = document.getElementById('bubbleContainer');
    const button = document.getElementById('cookButton');
    const body = document.body;
    
    if (bubbleSystem.animationRunning) {
      // Turn off all effects
      bubbleSystem.stop();
      container.classList.add('hidden');
      body.classList.add('glass-off');
      button.classList.add('bubbles-off');
      button.innerHTML = '👨‍🍳 Cook';
      saveBubbleState(false); // Save "off" state
    } else {
      // Turn on all effects  
      bubbleSystem.start();
      container.classList.remove('hidden');
      body.classList.remove('glass-off');
      button.classList.remove('bubbles-off');
      button.innerHTML = '👨‍🍳 Cook';
      saveBubbleState(true); // Save "on" state
    }
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyStoredBubbleState);
  } else {
    // DOM already loaded
    applyStoredBubbleState();
  }
  
  // Also apply state when bubble system is initialized
  const originalInit = window.bubbleSystem?.init;
  if (originalInit && window.bubbleSystem) {
    window.bubbleSystem.init = function() {
      originalInit.call(this);
      // Small delay to ensure initialization is complete
      setTimeout(applyStoredBubbleState, 100);
    };
  }
})();
