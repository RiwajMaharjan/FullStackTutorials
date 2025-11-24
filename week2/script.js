
 <!-- Maam code  -->
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('hero-video');
  const videoBtn = document.getElementById('toggle-video');

  function playPauseVideo(){
    if (video.paused) {
      video.play();
      videoBtn.textContent = 'Pause Video';
    } else {
      video.pause();
      videoBtn.textContent = 'Play Video';
    }
  };

  videoBtn.addEventListener('click',playPauseVideo);

  // Handle Audio Play/Pause Here
  let toggleAudio = document.querySelector("#toggle-audio");
  let sampleAudio = document.querySelector("#sample-audio");

  toggleAudio.addEventListener("click", function() {

      if (sampleAudio.paused) {
        sampleAudio.play()
        toggleAudio.textContent = "Pause Audio"

      }else {
        sampleAudio.pause()
        toggleAudio.textContent = "Play Audio"
      }
      
  })

  const canvas = document.getElementById('drawing-canvas');
  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let currentColor = '#000000';

  document.querySelectorAll('.color-picker button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentColor = e.target.dataset.color;
      ctx.strokeStyle = currentColor;
    });
  });

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.strokeStyle = currentColor;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  });

  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);


  document.getElementById('clear-canvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
  
  // Add Card when Button is Pressed
  const gridContainer = document.querySelector('.grid-container')
  const addBtn = document.querySelector('#add-card')
  i = 6
  addBtn.addEventListener("click", function() {

    console.log('yeah')
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent =`Card ${i++}`
    gridContainer.appendChild(card)
  })
});