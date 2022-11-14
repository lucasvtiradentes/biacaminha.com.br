function updateImages(){

  const imagesArr = document.querySelectorAll('.image-item')

  let finalObj = {}

  for (const el of imagesArr) {
    const name = el.getElementsByClassName('image-value')[0].getAttribute('name')
    let value = el.getElementsByClassName('image-value')[0].value

    if (name === "imagem_inicial"){

      let finalImg = ""
      const images = value.split('\n')
      for (let x = 0; x < images.length; x++) {
        const img = images[x];

        if (x === 0){
          finalImg = img
        } else {
          finalImg = finalImg + "," + img
        }
      }

      value = finalImg
    }

    finalObj[name] = value
  }

  
  const queryToUpdate = objectToQuery(finalObj)
  const finalUrl = `${baseUrl}/update?mode=images&${queryToUpdate}`
  
  fetch(finalUrl)
  .then(response => response.json())
  .then(data => console.log(data));

  alert('Imagens atualizadas com sucesso!')
}
