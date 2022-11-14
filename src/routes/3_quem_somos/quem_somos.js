const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  // reset: true
})

sr.reveal(`.who__are-img`,{interval: 200, origin: 'right'})
sr.reveal(`.who__are-text`,{interval: 200, origin: 'left'})