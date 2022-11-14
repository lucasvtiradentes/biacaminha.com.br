const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  // reset: true
})

sr.reveal(`#mandata`, { interval: 200 })
sr.reveal(`#mandata_projects`, { interval: 200, origin: 'left' })

/* ########################################################################## */

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let type = params.type;

if (type){
  console.log("Show selected mandata")
  showSelectedMandata(type)
} else {
  console.log("Show all mandata")
  showAllMandata()
}

/* ########################################################################## */

setAreaButtonsAction()

function setAreaButtonsAction(){
  const areas = document.getElementsByClassName('mandata__grid-item')

  for (const el of areas) {
    const title = el.getElementsByClassName('grid__item-title')[0]
    const category = title.getAttribute('category')
  
    el.addEventListener('click', () => {
  
      removeColors()
      el.setAttribute('style', 'color: var(--first-color);')
  
      const baseUrl = window.location.protocol + "//" + window.location.host
      const finalUrl = `${baseUrl}/getinfo?mode=mandata_category&category=${category}`
      console.log(finalUrl)
  
      fetch(finalUrl)
        .then(response => response.json())
        .then(data => {
          removeNews()
          addNews(data)
        });
  
    })
  
  }
}

function showAllMandata(){
  
  const baseUrl = window.location.protocol + "//" + window.location.host
  const finalUrl = `${baseUrl}/getinfo?mode=mandata`
  console.log(finalUrl)

  fetch(finalUrl)
    .then(response => response.json())
    .then(data => {
      removeNews()
      addNews(data)
    });
}

function showSelectedMandata(type){
  const baseUrl = window.location.protocol + "//" + window.location.host
  const finalUrl = `${baseUrl}/getinfo?mode=mandata_type&type=${type}`
  
  fetch(finalUrl)
  .then(response => response.json())
  .then(data => {
    removeNews()
    addNews(data)
  });
}
/* ########################################################################## */

function removeColors() {
  const areas = document.getElementsByClassName('mandata__grid-item')

  for (const el of areas) {
    el.setAttribute('style', 'color: var(--text-color);')
  }
}

function removeNews(){
  document.getElementsByClassName('mandata__projects')[0].innerHTML = ""
}

function addNews(news){

  var allNewsCode = ""

  if (!news){
    allNewsCode = '<p style="text-align: center;">Ainda não há projetos na categoria selecionada!</p>'
  } else {
    for (let x = 0; x < news.length; x++) {
      const element = news[x];
      const {
        mandata_category,
        mandata_title,
        mandata_date,
        mandata_link
      } = element
  
      allNewsCode = allNewsCode + generateNewsHtml(mandata_title, mandata_link)
    }
  
  }

  const projectsEl = document.getElementsByClassName("mandata__projects")[0]
  projectsEl.innerHTML = allNewsCode;

}

function generateNewsHtml(mandata_title, mandata_link){
  return `
  <a target="_blank" class="mandata__project" href="${mandata_link}">
    <img src="/routes/4_atuacao/2_projects/project__img.png" alt="" class="project__img">
    <p class="project__name">${mandata_title}</p>
    <img src="/routes/4_atuacao/2_projects/pdf.png" alt="" class="project__download">
  </a>`
}

/* ########################################################################## */
