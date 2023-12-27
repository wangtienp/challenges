const tabs = document.querySelectorAll('.tab')
const sidebar = document.querySelector('.sidebar')
const form = document.querySelector('#signup-form')
const userInput = document.querySelector('.tab input')
const subscribeBtn = document.querySelector('.tab #subscribe')
const userError = document.querySelector('.label-and-error #error')
const userEmail = document.querySelector('.tab #user-email')
const container = document.querySelector('.container')
const tabParagraphs = document.querySelectorAll('.tab p')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const validEmail = 'Valid email required'

let currentTab = 0
showTab(currentTab)
function showTab(n) {
    tabs[n].style.display='flex'
    sidebar.style.display = n===0?'block':'none'
    if(window.innerWidth<=480){
        tabs[1].style.height = '100dvh'
        tabParagraphs[1].style.flex = '10'
        container.style.maxWidth = n===0?'max-content':'100%'
        
    }else{
        container.style.maxWidth = n===0?'max-content':'40%'
    }
   
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
})

subscribeBtn.addEventListener('click',()=>{
    if(userInput.value.trim()===''||!(userInput.value.match(emailRegex))){
        userInput.classList.add('error')
        userError.textContent = validEmail
    }else{
        userInput.classList.remove('error')
        userError.textContent =''
        userEmail.textContent = userInput.value
        tabs[currentTab].style.display='none'
        currentTab++
        showTab(currentTab)
    }
})





