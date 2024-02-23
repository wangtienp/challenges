let answers = document.querySelectorAll('.container .faq-answer')
let questions = document.querySelectorAll('.container .faq-question')
let image = document.querySelectorAll('.container .faq-question .image')
const plus = './assets/images/icon-plus.svg'
const minus = './assets/images/icon-minus.svg'

questions.forEach((question, index) => {

    question.addEventListener('click', () => {
        toReset(answers,index)
        answers[index].classList.toggle('selected')
        //to close and open current answer
        image[index].src = answers[index].classList.contains('selected')?minus:plus

    })
})

function toReset(list,i){
    list.forEach((answer,index)=>{
        if(index !== i){
            answer.classList.remove('selected')
            image[index].src = plus
        }
    })
}