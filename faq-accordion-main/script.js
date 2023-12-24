let answers = document.querySelectorAll('.container .faq-answer p')
let questions = document.querySelectorAll('.container .faq-question')
let image = document.querySelectorAll('.container .faq-question .image')
const plus = './assets/images/icon-plus.svg'
const minus = './assets/images/icon-minus.svg'

questions.forEach((question, index) => {

    question.addEventListener('click', () => {
        answers[index].classList.toggle('selected')
        //to close and open current answer
        if (answers[index].classList.contains('selected')) {
            image[index].src = minus //if got selected then the image is plus

        }
        else {
            image[index].src = plus
        }
        //to close other answers that are open
        answers.forEach((answer, jIndex) => {
            if (index !== jIndex) {
                if (answer.classList.contains('selected')) {
                    answer.classList.remove('selected')
                    image[jIndex].src = plus

                }
            }

        })

    })
})