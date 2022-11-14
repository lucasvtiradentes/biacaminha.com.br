export default function getCurrentDateTime(option){ /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  
  const NODE_ENV = process.env.NODE_ENV

  let dateIndex;
  let timeIndex;

  if (NODE_ENV == 'production'){
    dateIndex = 3
    timeIndex = 3
  } else {
    dateIndex = 0
    timeIndex = 0
  }

  // TIME ======================================================================
  var dateObj = new Date(new Date().getTime() - (dateIndex * 60) * 60 * 1000)
  var timeObj = new Date(new Date().getTime() - (timeIndex * 60) * 60 * 1000)
  
  // DATE ======================================================================
  const currentDate = dateObj.toLocaleDateString('pt-BR');
  const currentHour = (timeObj.getHours().length == 1) ? "0" + timeObj.getHours() : timeObj.getHours()
  const currentMinute = (timeObj.getMinutes().length == 1) ? "0" + dateObj.getMinutes() : timeObj.getMinutes()
  const currentTime = `${currentHour}:${currentMinute}`

  if (option === "date"){
    return currentDate
  } else if (option === "time"){
    return currentTime
  } else {
    return currentDate + " - " + currentTime
  }

}