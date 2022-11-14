/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu')
const navToogle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')
const navLink = document.querySelectorAll('.nav__link')
const showCurLink = document.querySelectorAll('.cur__link')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToogle) {
  navToogle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
    console.log("Ativa")
  })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

const section = (window.location.href).replace(`${window.location.protocol}//${window.location.host}`, '')

for (const el of showCurLink) {
  const elHref = el.getAttribute('href')
  if (elHref === section){
    // console.log(elHref + " === " +  section)
    el.classList.add('active-link')
    el.setAttribute('style', 'color: var(--first-color);')
  }
}

/* -------------------------------------------------------------------------- */


if (window.matchMedia("(max-width: 767px)").matches) {
  
  console.log("SIM MEDIA QUERY")

  var coll = document.getElementsByClassName("collapsible-head");
  var i;
  
  for (i = 0; i < coll.length; i++) {
    
    console.log(coll[i])

    coll[i].addEventListener("click", function() {
      
      var content = this.nextElementSibling; 
      
      // this.classList.toggle("active");
      content.classList.toggle("active");
      const aElements = content.getElementsByTagName('a')
  
      console.log(content)
      console.log(aElements)
  
      for (let x = 0; x < aElements.length - 1; x++) {
        const aEl = aElements[x];
        console.log(aEl)
      }
  
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
} else {
  // Viewport is greater than 700 pixels wide
}

