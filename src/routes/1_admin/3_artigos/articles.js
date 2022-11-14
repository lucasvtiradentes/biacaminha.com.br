
CKEDITOR.replace('editor1', {
  width: '100%',
  height: 500,
  removeButtons: 'PasteFromWord'
});


CKEDITOR.replace('editor3', {
  width: '100%',
  height: 500,
  removeButtons: 'PasteFromWord'
});

/* ########################################################################## */

function getArticleQuery(el) {
  const button = el.getElementsByTagName('button')[0]
  const article_id = button.getAttribute('article_id')
  return `id=${article_id}`
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

/* ########################################################################## */

function showModal(modal) {
  modal.style.display = "block";
}

function closeModal(modal) {
  modal.getElementsByClassName('close')[0].click()
  modal.style.display = "none";
}

/* ########################################################################## */

function setArticlePayload(modal, title, content, article_id) {

  const modalTitle = modal.getElementsByClassName('article-title')[0]
  modalTitle.value = title

  const modalContent = modal.querySelectorAll('.cke_contents > textarea')[0]
  modalContent.value = content

  document.querySelector('.edit-article').setAttribute('edited_id', article_id)
}

function getArticlePayload(modalContent, getId) {

  const article_title = modalContent.getElementsByClassName('article-title')[0].value
  const content = modalContent.querySelector('.cke_contents > textarea')
  const article_content = content.value

  if (getId) {
    const article_id = document.querySelector('.edit-article').getAttribute('edited_id')

    return {
      article_id,
      article_title,
      article_content
    }
  } else {

    return {
      article_title,
      article_content
    }
  }

}

function resetArticleModal(modal) {
  const modalTitle = modal.getElementsByClassName('article-title')[0]
  if (modalTitle) {
    modalTitle.value = ""
  } else {
    console.log("Nao achou title!")
  }

  const modalContent = modal.querySelectorAll('.cke_contents > textarea')[0]
  if (modalContent) {
    modalContent.value = ""
  } else {
    console.log("Nao achou content!")
  }
}

function clickSource(currentModal) {

  const source = currentModal.querySelectorAll('span.cke_toolgroup > a.cke_button__source')

  if (source[0]) {
    source[0].click()
  }

}

/* ########################################################################## */

const addArticle = document.getElementsByClassName('add-article-button')

addArticle[0].addEventListener('click', async function () {

  const modalContent = document.getElementsByClassName('add-article-content')[0]
  clickSource(modalContent)

  const payload = getArticlePayload(modalContent)
  const finalUrl = `${baseUrl}/addarticle`

  fetch(finalUrl, {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then((res) => { return res.json(); })
    .then((data) => {
      resetArticleModal(modalContent)
      closeModal(modalContent)

      // modalContent.getElementsByClassName('close')[0].click()
      addNewArticle(data)
    
      const lastCollapsible = document.querySelectorAll('.articles__container > .collapsible__article')
      const el = lastCollapsible[lastCollapsible.length - 1]
  
      setupColapsable(el)
      setupArticleElButtons(el)

      alert('Artigo adicionada com sucesso!')
    })

})

/* ########################################################################## */

const articles = document.getElementsByClassName('collapsible__article')

for (const el of articles) {
  setupArticleElButtons(el)
}

function setupArticleElButtons(el){

  const removeButton = el.getElementsByClassName('button-remove')[0]
  const updateButton = el.getElementsByClassName('button-update')[0]

  setRemoveCurrentArticle(removeButton, el)
  setEditCurrentArticle(updateButton, el)

}


function setRemoveCurrentArticle(button, el) {

  button.addEventListener('click', async function () {
    
    const query = getArticleQuery(el)
    const finalUrl = `${baseUrl}/update?mode=removearticle&${query}`

    fetch(finalUrl)
      .then(response => response.json())
      .then(data => {
        removeArticle(el)
        alert('Artigo removida com sucesso!')
      });
  })

}

function setEditCurrentArticle(button, el) {

  button.addEventListener('click', async function () {

    const editModal = document.querySelector('.edit-article > div.modal')
    showModal(editModal)

    const saveButton = editModal.querySelector('.edit-article-button')
    const closeButton = editModal.querySelector('span.close')
    setEditArticleFunctions(editModal, saveButton, closeButton)

    const finalUrl = `${baseUrl}/getinfo?mode=article&${getArticleQuery(el)}`

    fetch(finalUrl)
      .then(response => response.json())
      .then(async (data) => {

        clickSource(editModal)

        const { article_title, article_content, article_id } = data[0]
        setArticlePayload(editModal, article_title, article_content, article_id)

        await delay(500)
        clickSource(editModal)

      });

  })

}

/* ########################################################################## */

function setEditArticleFunctions(modal, saveButton, closeButton) {

  async function closeArticleEdits() {
    closeModal(modal)
    removeEventListeners()
  }

  async function saveArticleEdits() {

    clickSource(modal)

    const editArticleModal = document.getElementsByClassName('edit-article')[0]
    const payload = getArticlePayload(editArticleModal, true)


    const getElFromId = (id) => {
      const articles = document.getElementsByClassName('collapsible__article')

      for (const el of articles) {
        const curEl = el.querySelector('button')
        const curId = curEl.getAttribute('article_id')
        if (curId === id){
          return el
        }
      }
    }
    const el = getElFromId(payload.article_id)
    
    const finalUrl = `${baseUrl}/updatearticle`

    fetch(finalUrl, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((res) => { return res.json(); })
      .then((data) => {
        resetArticleModal(modal)
        clickSource(modal)

        renameArticle(el, payload.article_title)
        alert('Artigo atualizado com sucesso!')
        closeModal(modal)
        removeEventListeners()
      })

  }

  function removeEventListeners() {
    closeButton.removeEventListener('click', closeArticleEdits)
    saveButton.removeEventListener('click', saveArticleEdits)
  }

  closeButton.addEventListener('click', closeArticleEdits)
  saveButton.addEventListener('click', saveArticleEdits)

}


/* ########################################################################## */


function removeArticle(el){
  el.remove()
}

function addNewArticle(article_info){
  const elArticleContainer = document.getElementsByClassName('articles__container')[0]
  const elNews = generateArticleHtml(article_info)
  elArticleContainer.insertAdjacentHTML('beforeend', elNews)
}

function renameArticle(el, newTitle){
  const button = el.querySelector('button.collapsible')
  // button.innerText = newTitle
}

function generateArticleHtml(article_info){

  const {    
    article_id,
    article_title,
  } = article_info

  return `
  <div class="article__container collapsible__container collapsible__article">
    <button type="button" class="collapsible" article_id="${article_id}">${article_title}</button>
    <div action="#" class="article-single content">
      <div class="article-item" style="display: none;">
        <%- article.article_content %>
      </div>
      <div class="article-buttons">
        <button class="button-remove button myBtn">Apagar</button>
        <button class="button-update button myBtn">Editar</button>
      </div>
    </div>
  </div>
  `

}
