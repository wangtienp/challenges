const textarea = document.querySelector('#input')
const choices = document.querySelector('.choices')

textarea.addEventListener('input', addChoice)

function addChoice(e) {
    const value = e.target.value
    const res = value.split(',')
    choices.innerHTML = ''

    res.forEach(choice => {
        if (choice === '') return
        choices.innerHTML += `<span class='choice'>${choice}</span>`
    })
    pickRandomChoice(e)
}
function pickRandomChoice(e) {
    if (e.inputType === 'insertLineBreak') {
        e.target.value = ''
        const getChoices = document.querySelectorAll('.choice')
        chooseActive(getChoices)
    }
}

function chooseActive(choosen){
   
    const id = setInterval(()=>{
        removeChoosen(choosen)
        let random = Math.floor(Math.random()*choosen.length)
        choosen[random].classList.add('choosen')
    },100)
    setTimeout(()=>{
        clearInterval(id)
    },3000)
}
function removeChoosen(choosen){
    choosen.forEach(choice=>{
        choice.classList.remove('choosen')
    })
}