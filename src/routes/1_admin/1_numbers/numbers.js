function updateNumbers(){

  const numbersArr = document.querySelectorAll('.number-item')

  let finalObj = {}

  for (const el of numbersArr) {
    const name = el.getElementsByClassName('number-value')[0].getAttribute('name')
    const value = el.getElementsByClassName('number-value')[0].value

    finalObj[name] = value
  }

  const queryToUpdate = objectToQuery(finalObj)
  const finalUrl = `${baseUrl}/update?mode=numbers&${queryToUpdate}`
  
  console.log(finalUrl)
  
  fetch(finalUrl)
  .then(response => response.json())
  .then(data => console.log(data));

  alert('Números atualizados com sucesso!')
}