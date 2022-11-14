const baseUrl = window.location.protocol + "//" + window.location.host

function objectToQuery(params) {
  return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
}

/* -------------------------------------------------------------------------- */

function collapsibleActions(type){

  let selector;

  if (type === 'all'){
    selector = 'collapsible__container'
  } else if (type === 'articles'){
    selector = 'collapsible__article'
  } else if (type === 'news'){
    selector = 'collapsible__news'
  } else if (type === 'mandata'){
    selector = 'collapsible__mandata'
  }

  var collapsible = document.getElementsByClassName(selector);

  for (let i = 0; i < collapsible.length; i++) {
    const currentCollapsible = collapsible[i]
    setupColapsable(currentCollapsible)
  }
}

collapsibleActions('all', 'setup')

function setupColapsable(el){
  const collapsibleButton = el.getElementsByTagName('button')[0]
  const collapsibleContent = el.getElementsByClassName('content')[0]
  const collapsibleTitle = collapsibleButton.innerText

  collapsibleButton.addEventListener("click", function () {
    collapsibleButton.classList.toggle("active");

    if (collapsibleContent.style.display === "block") {
      collapsibleContent.style.display = "none";
    } else {
      collapsibleContent.style.display = "block";
      closeAllColapsables(collapsibleTitle)
    }

  })
}

function closeAllColapsables(currentTitle) {

  var collapsible = document.getElementsByClassName("collapsible__container");

  for (let i = 0; i < collapsible.length; i++) {
    const currentCollapsible = collapsible[i]
    const collapsibleButton = currentCollapsible.getElementsByTagName('button')[0]
    const collapsibleContent = currentCollapsible.getElementsByClassName('content')[0]
    const collapsibleTitle = collapsibleButton.innerText

    const isActive = collapsibleButton.classList.contains("active")

    if (isActive) {
      if(currentTitle !== collapsibleTitle){
        collapsibleButton.click()
      }
    }

  }

}

/* -------------------------------------------------------------------------- */

var btn = document.getElementsByClassName("modalButton");

for (const el of btn) {

  const parentEl = el.parentElement
  const modal = parentEl.getElementsByClassName("myModal")[0]
  const closeEl = parentEl.getElementsByClassName("close")[0];

  el.onclick = function () {
    modal.style.display = "block";
  }

  closeEl.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    const curModal = event.target
    const condition = curModal.classList.contains("modal")
    if (condition) {
      curModal.style.display = "none";
    }
  }
}

/* -------------------------------------------------------------------------- */
