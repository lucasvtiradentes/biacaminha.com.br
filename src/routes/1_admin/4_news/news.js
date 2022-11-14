const news = document.getElementsByClassName('collapsible__news')

for (const el of news) {
  setupNewsElButtons(el)
}

function setupNewsElButtons(el){
  const removeButton = el.getElementsByClassName('button-remove')[0]
  const updateButton = el.getElementsByClassName('button-update')[0]

  removeButton.addEventListener('click', async function(){
    const query = generateNewsQuery(getNewsValues(el))
    const finalUrl = `${baseUrl}/update?mode=removenews&${query}`
    console.log(finalUrl)
  
    fetch(finalUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      removeNews(el)
      alert('Notícia removida com sucesso!')
    });
  })
  
  updateButton.addEventListener('click', async function(){
    const newsObj = getNewsValues(el)
    const query = generateNewsQuery(newsObj)
    const finalUrl = `${baseUrl}/update?mode=updatenews&${query}`
    console.log(finalUrl)

    fetch(finalUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      renameNews(el, newsObj.news_title)
      alert('Notícia atualizada com sucesso!')
    });
  })
}

function getNewsValues(el){

  const news_title = el.getElementsByClassName('news-title')[0].value
  const news_image = el.getElementsByClassName('news-image')[0].value
  const news_link = el.getElementsByClassName('news-link')[0].value
  const news_date = el.getElementsByClassName('news-date')[0].value
  const news_owner = el.getElementsByClassName('news-owner')[0].value
  
  return {
    news_title,
    news_image,
    news_link,
    news_date,
    news_owner
  }

}

function generateNewsQuery(newsObj){

  const {
    news_title,
    news_image,
    news_link,
    news_date,
    news_owner
  } = newsObj

  const query = `news_title=${news_title}&news_image=${news_image}&news_link=${news_link}&news_date=${news_date}&news_owner=${news_owner}`
  return query
}

/* -------------------------------------------------------------------------- */

const addNews = document.getElementsByClassName('add-news-button')

addNews[0].addEventListener('click', async function() {
  const addNewsModal = document.getElementsByClassName('add-news-modal')[0]
  const modalContent = addNewsModal.getElementsByClassName('modal-content')[0]
  const modalInputs = modalContent.getElementsByClassName('news-input')

  function getAddModalVariables(){
    var newsObj = {}
    for (const el of modalInputs) {
      const variable = el.getAttribute('name')
      const value = el.value
      const currentLine = `${variable}=${value}`
  
      newsObj[variable] = value
    }

    return newsObj
  }
  
  const newsObj = getAddModalVariables()
  const query = generateNewsQuery(newsObj)
  const finalUrl = `${baseUrl}/update?mode=addnews&${query}`
  
  fetch(finalUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data)

    for (const el of modalInputs) {
      el.value = ""
    }

    modalContent.getElementsByClassName('close')[0].click()
    addNewNews(newsObj)
    
    const lastCollapsible = document.querySelectorAll('.news__container > .collapsible__news')
    const el = lastCollapsible[lastCollapsible.length - 1]

    setupColapsable(el)
    setupNewsElButtons(el)
    alert('Notícia adicionada com sucesso!')
  });
})


/* -------------------------------------------------------------------------- */


function renameNews(el, newTitle){
  const button = el.querySelector('button.collapsible')
  // button.innerText = newTitle
}

function removeNews(el){
  el.remove()
}

function addNewNews(news_info){
  const elNewsContainer = document.getElementsByClassName('news__container')[0]
  const elNews = generateNewsHtml(news_info)
  elNewsContainer.insertAdjacentHTML('beforeend', elNews)
}

function generateNewsHtml(news_info){

  const {    
    news_title,
    news_image,
    news_link,
    news_date,
    news_owner
  } = news_info

  return `
  <div class="collapsible__container collapsible__news">

    <button type="button" class="collapsible">${news_title}</button>
    <div action="#" class="news-single content">
      
      <div class="news-item">

        <div class="news-row">
          <div class="news-name">Título</div>
          <input class="news-title news-input" type="text" name="news-title" value='${news_title}'>
        </div>

        <div class="news-row">
          <div class="news-name">Link imagem</div>
          <input class="news-image news-input" type="text" name="news-image" value='${news_image}'>
        </div>

        <div class="news-row">
          <div class="news-name">Link matéria</div>
          <input class="news-link news-input" type="text" name="news-link" disabled="disabled" value='${news_link}'>
        </div>

        <div class="news-row">
          <div class="news-name">Data da matéria</div>
          <input class="news-date news-input" type="date" name="news-date" value='${news_date}'>
        </div>

        <div class="news-row">
          <div class="news-name">Site da matéria</div>
          <input class="news-owner news-input" type="text" name="news-owner" value='${news_owner}'>
        </div>
        
      </div>

      <div class="news-buttons">
        <button class="button-remove button myBtn">Apagar</button>
        <button class="button-update button myBtn">Atualizar</button>
      </div>
    </div>
    
  </div>
  `

}
