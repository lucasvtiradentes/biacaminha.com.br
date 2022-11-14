const mandatas = document.getElementsByClassName('collapsible__mandata')

for (const el of mandatas) {
  setupMandataElButtons(el)
}

function setupMandataElButtons(el){
  const removeButton = el.getElementsByClassName('button-remove')[0]
  const updateButton = el.getElementsByClassName('button-update')[0]

  removeButton.addEventListener('click', async function(){
    const query = generateMandataQuery(getMandataValues(el))
    const finalUrl = `${baseUrl}/update?mode=removemandata&${query}`
    console.log(finalUrl)
  
    fetch(finalUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      removeMandata(el)
      alert('Mandata removida com sucesso!')
    });
  })
  
  updateButton.addEventListener('click', async function(){
    const mandataObj = getMandataValues(el)
    const query = generateMandataQuery(mandataObj)
    const finalUrl = `${baseUrl}/update?mode=updatemandata&${query}`
    console.log(finalUrl)

  
    fetch(finalUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      renameMandata(el, mandataObj.mandata_title)
      alert('Mandata atualizada com sucesso!')
    });
  })
}

function getMandataValues(el){

  const mandata_title = el.getElementsByClassName('mandata-title')[0].value
  const mandata_link = el.getElementsByClassName('mandata-link')[0].value
  const mandata_date = el.getElementsByClassName('mandata-date')[0].value
  const mandata_category = el.getElementsByClassName('mandata-category')[0].value
  const mandata_type = el.getElementsByClassName('mandata-type')[0].value

  return {
    mandata_title,
    mandata_link,
    mandata_category,
    mandata_date,
    mandata_type
  }
}

function generateMandataQuery(mandataObj){

  const {
    mandata_title,
    mandata_link,
    mandata_category,
    mandata_date,
    mandata_type
  } = mandataObj

  const query = `mandata_title=${mandata_title}&mandata_category=${mandata_category}&mandata_type=${mandata_type}&mandata_link=${mandata_link}&mandata_date=${mandata_date}`
  return query
}

/* -------------------------------------------------------------------------- */

const addMandata = document.getElementsByClassName('add-mandata-button')

addMandata[0].addEventListener('click', async function() {
  const modalContent = document.getElementsByClassName('add-mandata-modal')[0]
  const modalInputs = modalContent.getElementsByClassName('mandata-input')

  function getAddModalVariables(){
    var mandataObj = {}
    for (const el of modalInputs) {
      const variable = el.getAttribute('name')
      const value = el.value
      const currentLine = `${variable}=${value}`
  
      mandataObj[variable] = value
    }

    return mandataObj
  }

  const mandataObj = getAddModalVariables()
  const query = generateMandataQuery(mandataObj)
  const finalUrl = `${baseUrl}/update?mode=addmandata&${query}`
  
  console.log(finalUrl)
  
  fetch(finalUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data)

    for (const el of modalInputs) {
      el.value = ""
    }

    modalContent.getElementsByClassName('close')[0].click()

    addNewMandata(mandataObj)
    const lastCollapsible = document.querySelectorAll('.mandata__container > .collapsible__mandata')
    const el = lastCollapsible[lastCollapsible.length - 1]

    setupColapsable(el)
    setupMandataElButtons(el)

    alert('Mandata adicionada com sucesso!')
  });
})

/* -------------------------------------------------------------------------- */

function renameMandata(el, newTitle){
  const button = el.querySelector('button.collapsible')
  // button.innerText = newTitle
}

function removeMandata(el){
  el.remove()
}

function addNewMandata(mandata_info){
  const elMandataContainer = document.getElementsByClassName('mandata__container')[0]
  const elMandata = generateMandataHtml(mandata_info)

  elMandataContainer.insertAdjacentHTML('beforeend', elMandata)
}

function generateMandataHtml(mandata_info){

  const {    
    mandata_title,
    mandata_link,
    mandata_category,
    mandata_date,
    mandata_type
  } = mandata_info

  return `
  <div class="collapsible__container collapsible__mandata">

  <button type="button" class="collapsible">
    ${mandata_title}
  </button>
  <div action="#" class="mandata-single content">
    <div class="mandata-item">

      <div class="mandata-row">
        <div class="mandata-name">Título</div>
        <input class="mandata-title mandata-input" type="text" name="fname" value='${mandata_title}'>
      </div>

      <div class="mandata-row">
        <div class="mandata-name">Categoria</div>
        <select name="category" class="mandata-input mandata-category" value='${mandata_category}'>
        <option value="educacao" ${mandata_category === "educacao" ? "selected" : ""}>Educação</option>
        <option value="mulheres" ${mandata_category === "mulheres" ? "selected" : ""}>Mulheres</option>
        <option value="movimento-negro" ${mandata_category === "movimento-negro" ? "selected" : ""}>Movimento negro</option>
        <option value="movimento-lgbtqia" ${mandata_category === "movimento-lgbtqia" ? "selected" : ""}>Movimento LGBTQIA+</option>
        </select>
      </div>

      <div class="mandata-row">
        <div class="mandata-name">Tipo</div>
        <select name="type" class="mandata-input mandata-type" value='${mandata_type}'>
          <option value="projetos_de_lei" ${mandata_type === "projetos_de_lei" ? "selected" : ""}>Projetos de lei</option>
          <option value="requerimentos" ${mandata_type === "requerimentos" ? "selected" : ""}>Requerimentos</option>
          <option value="oficios" ${mandata_type === "oficios" ? "selected" : ""}>>Ofícios</option>
          <option value="sessoes_especiais" ${mandata_type === "sessoes_especiais" ? "selected" : ""}>Sessões especiais</option>
        </select>
      </div>

      <div class="mandata-row">
        <div class="mandata-name">Link arquivo</div>
        <input class="mandata-link mandata-input" type="text" name="fname" disabled="disabled"
          value='${mandata_link}'>
      </div>

      <div class="mandata-row">
        <div class="mandata-name">Data</div>
        <input class="mandata-date mandata-input" type="date" name="fname" value='${mandata_date}'>
      </div>

    </div>

    <div class="mandata-buttons">
      <button class="button-remove button myBtn">Apagar</button>
      <button class="button-update button myBtn">Atualizar</button>
    </div>

  </div>
</div>
  `

}
