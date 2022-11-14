const baseUrl = window.location.protocol + "//" + window.location.host

function animateValue(obj, start, end) {
  const duration = 5000;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const numbersArr = document.querySelectorAll('.number__number-item')

for (const el of numbersArr) {

  const name = el.getElementsByClassName('number__info-title')[0].getAttribute('name')
  const value = el.getElementsByClassName('number__info-title')[0].getAttribute('value')

  animateValue(el.getElementsByClassName('number__info-title')[0], 0, value);
}

/* -------------------------------------------------------------------------- */
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  // reset: true
})

sr.reveal(`#home, #galery`,{interval: 200, beforeReveal: beforeReveal})
sr.reveal(`#number, #artigos`,{interval: 200, origin: 'left', beforeReveal: beforeReveal})
sr.reveal(`#lastnews`,{interval: 200, origin: 'right', beforeReveal: beforeReveal})
