class Weather{
  constructor(city) {
    this.city = city
    this.api = '80871c3028e853529bd8461205cfb0a4'
  }
}

document.querySelector('.cont').style.display = 'none'

class UI{
  showweather(weather){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weather.city}&appid=${weather.api}`)
    .then(res=>res.json())
    .then(function(data){
      console.log(data)
      const locvalue = data.name
      const descvalue = data['weather'][0]['description']
      const tempvalue = Math.round(data.main.temp-273)
      const country = data['sys']['country']


      // paint ui
      document.querySelector('.location').innerHTML = locvalue
      document.querySelector('.desc').innerHTML = descvalue
      document.querySelector('.temp'). innerHTML = `Temp: ${tempvalue} &#176C`
      document.querySelector('.country').innerHTML = country
    })
  }

  showalert(message, className){
    const div = document.createElement('div')
    const show = document.querySelector('.show')
    div.className = `alert ${className}`
    div.textContent = message

    show.appendChild(div)
  }
}


// STORE
class Store{
  static getweather(){
    let weathers;

    if(localStorage.getItem('weathers') === null){
      weathers = []
    } else {
      weathers = JSON.parse(localStorage.getItem('weathers'))
    } 
    return weathers
  }

  static addweather(weather){
    const weathers = Store.getweather()

    weathers.push(weather)

    localStorage.setItem('weathers', JSON.stringify(weathers))
  }
  static displayweather(){
    const weathers = Store.getweather()

    weathers.forEach(function(weather){
      const ui = new UI()

      ui.showweather(weather)
    })
  }
  static removeweather(){}

}

document.addEventListener('DOMContentLoaded', Store.displayweather)

window.addEventListener('load', function(e){
  let long;
  let lat;
  
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      
      document.querySelector('.cont').style.display = 'block'
      
      long = position.coords.longitude
      lat = position.coords.latitude
      

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=80871c3028e853529bd8461205cfb0a4`)
    .then(res=>res.json())
    .then(function(data){
      console.log(data)

      
      const locvalue = data.name
      const descvalue = data['weather'][0]['description']
      const tempvalue = Math.round(data.main.temp-273)
      const country = data['sys']['country']
      const iconvalue = data['weather'][0]['icon']
      
       // paint ui
       document.querySelector('.location').innerHTML = locvalue
       document.querySelector('.desc').innerHTML = descvalue
       document.querySelector('.temp'). innerHTML = `Temp: ${tempvalue} &#176C`
       document.querySelector('.country').innerHTML = country
       document.querySelector('.icon').innerHTML = iconvalue 

      
    })


    })
  }

  e.preventDefault()
})


document.querySelector('.change-btn').addEventListener('click', function(e){
  const city = document.getElementById('city').value
  
  const weather = new Weather(city)
  const ui = new UI()
  
  if(city === ''){
    alert('Please Enter Fields')
  } else {
    ui.showweather(weather)

    Store.addweather(weather)
  }

  e.preventDefault()
})