const items = document.querySelectorAll('.item');
let hue=0;
items.forEach(item => {
  item.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
  hue += 30;
})
const imageContainer = document.querySelector('.image-container');
const slider2 = document.querySelector('.slider2');
let pictures = []
let transformArray = []
let counter = 0

const endpoint = 'https://api.nekosapi.com/v3/images/random?rating=safe&limit=6'
async function getImages() {
  const res = await fetch(endpoint)
  if (!res.ok) {
    throw Error('Something went wrong')
  }
  const data = await res.json()
  pictures = data.items
  console.log(pictures)
  displayImages()
  
}

function displayImages() {
  pictures.forEach((picture) => {
    console.log(picture.image_url)
    const slide = document.createElement('div')
    slide.classList.add('slide')
    slide.innerHTML =`<img src="${picture.image_url}" class="item">`
    slider2.appendChild(slide)
  })
  // slideImages()
}

getImages()

function slideImages(){
  let counter = 0
  const images = document.querySelectorAll('.item')
  setInterval(()=>{
    images[counter].style.transform = 'translateX(-100%)'
    if(counter>= images.length-1){
      counter = 0}
      else{
        counter++}
    images[counter].style.transform = 'translateX(0%)'
  },5000)
}

function slideNext(){
  
  const images = document.querySelectorAll('.item')
  images[counter].style.animation = 'next1 0.5s ease-in-out forwards'
  if(counter>= images.length-1){
    counter = 0}
  else{
    counter++}
  images[counter].style.animation = 'next2 0.5s ease-in-out forwards'
}