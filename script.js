const slider = document.querySelector(".slider");
const innerSlider = document.querySelector(".inner_slider");
const container = document.querySelector(".container");

handleProgressBar(document.querySelector('.progress_box'))

document.addEventListener("click", e => {
  let btn;
  if (e.target.matches(".btn")) btn = e.target;
  else btn = e.target.closest(".btn");
  if (btn != null) handleClick(btn);
})

const throtling = throttle(() => {
  handleProgressBar(document.querySelector('.progress_box'))
}, 500)

window.addEventListener("resize", throtling);

function handleProgressBar(progressBox) {
  progressBox.innerHTML = "";
  let slideScreenIndex = +getComputedStyle(slider).getPropertyValue('--slide-per-screen');
  let slideIndex = Math.abs(+getComputedStyle(slider).getPropertyValue('--slide-index'));
  const slideCount = slider.querySelectorAll('.slide').length;
  const progressBarCount = Math.ceil(slideCount / slideScreenIndex);

  if (slideIndex >= progressBarCount) {
    slider.style.setProperty('--slide-index', -progressBarCount + 1);
  }

  for (let i = 0; i < progressBarCount; i++) {
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress_bar");
    if (slideIndex == i) progressBar.classList.add("active");
    progressBox.append(progressBar);
  }
}

const handleClick = (btn) => {
  const allProgressBar = [...document.querySelectorAll('.progress_bar')];
  let slideIndex = +getComputedStyle(slider).getPropertyValue('--slide-index');

  allProgressBar.forEach(progressBar => {
    progressBar.classList.remove("active");
  })

  if (btn.classList.contains('btn--right')) {
    slider.style.setProperty('--slide-index', slideIndex -= 1);
    allProgressBar[Math.abs(slideIndex)].classList.add("active");
  }

  else if (btn.classList.contains('btn--left')) {
    slider.style.setProperty('--slide-index', slideIndex += 1);
    allProgressBar[Math.abs(slideIndex)].classList.add("active");
  }
}

let drx = 0;
const touchstart = throttle((e) => {
  drx = e.targetTouches[0].clientX
}, 250)

const touchend = throttle((e) => {
  let rx = e.changedTouches[0].clientX

  let slideIndex = +getComputedStyle(slider).getPropertyValue('--slide-index');
  const allProgressBar = [...document.querySelectorAll('.progress_bar')];

  if (drx >= rx + 50) {
    allProgressBar.forEach(progressBar => {
      progressBar.classList.remove("active");
    })

    slider.style.setProperty('--slide-index', slideIndex -= 1);
    allProgressBar[Math.abs(slideIndex)].classList.add("active");
    return
  }
  else if (drx <= rx - 50) {
    allProgressBar.forEach(progressBar => {
      progressBar.classList.remove("active");
    })

    slider.style.setProperty('--slide-index', slideIndex += 1);
    allProgressBar[Math.abs(slideIndex)].classList.add("active");
    return
  } else return

}, 250)

container.addEventListener("touchstart", touchstart)
container.addEventListener("touchend", touchend)


function throttle(cb, delay = 100) {
  let shouldWait = false;
  let wattingargs;

  const timeoutFunc = () => {
    if (wattingargs == null) {
      shouldWait = false;
    } else {
      cb(...wattingargs);
      wattingargs = null;
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if (shouldWait) {
      wattingargs = args;
      return
    }
    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay)
  }
}