function updateForms(){

  const formsArr = document.querySelectorAll('.form-item')

  let finalObj = {}

  for (const el of formsArr) {
    const name = el.getElementsByClassName('form-value')[0].getAttribute('name')
    const value = el.getElementsByClassName('form-value')[0].value

    finalObj[name] = value
  }

  const queryToUpdate = objectToQuery(finalObj)
  const finalUrl = `${baseUrl}/update?mode=forms&${queryToUpdate}`
  
  console.log(finalUrl)
  
  fetch(finalUrl)
  .then(response => response.json())
  .then(data => console.log(data));

  alert('Formulários atualizados com sucesso!')
}