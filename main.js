

window.onload = async () => {
  const videoEl = document.querySelector("#camera");
  const canvasEl = document.querySelector("#picture");
  const timerEl = document.querySelector("#timer");
  const shutterEl = document.querySelector("#shutter");
  const countdownEl = document.querySelector("#countdown");
  let time = 1;
  
  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 32) {
      e.preventDefault();
      shutterEl.click();
    }
  });
  

  const constraints = {
    audio: false,
    video: {
      width: 600,
      height: 400,
      facingMode: "user",
    },
  };

  const medias = await navigator.mediaDevices.getUserMedia(constraints)
  videoEl.srcObject = medias;
  videoEl.onloadedmetadata = () => {
    videoEl.play();
  };

  function takePhoto() {
    const ctx = canvasEl.getContext("2d");
    ctx.save()
    ctx.scale(-1, 1);
    ctx.translate(-canvasEl.width, 0);
    ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
    ctx.restore();
  }

  timerEl.addEventListener("change", (e) => {
    time = e.target.value;
  });

  shutterEl.addEventListener("click", () => {
    let count = time;
    countdownEl.innerHTML = count;
    countdownEl.classList.remove("hidden");
    const interval = setInterval(() => {
      countdownEl.innerHTML = count;
      if (count === 0) {
        clearInterval(interval);
        takePhoto();
        countdownEl.classList.add("hidden");
      } else {
        count--;
      }
    }, 1000);
    count--;

  });
};