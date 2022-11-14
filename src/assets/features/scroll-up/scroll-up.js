/*==================== SHOW SCROLL TOP ====================*/ 
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  const pageLevel = 700;

  if(this.scrollY >= pageLevel) {
    scrollUp.classList.add('show-scroll');
    // console.log(this.scrollY)
  } else {
    scrollUp.classList.remove('show-scroll')
  }
}
window.addEventListener('scroll', scrollUp)
