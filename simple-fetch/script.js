let count = 1

const output = document.querySelector('#animal-info')
const btn1 = document.querySelector('#btn')

btn1.addEventListener('click', () => {
    const myUrl = `https://learnwebcode.github.io/json-example/animals-${count}.json`
    fetch(myUrl).then(response => response.json()).then(
        data => display(data)
    )
    count++
    if (count > 3) btn1.classList.add('hide-me')
})
function display(animals) {
    animals.forEach(animal => {
        console.log(animal)
        output.innerHTML += `<p>${animal.name}is a ${animal.species} that loves ${getFavFood(animal.foods.likes)} but hates ${getDislikeFood(animal.foods.dislikes)}</p>`
    })
}
function getFavFood(foodArr) {
    let start = ``
    foodArr.forEach((food, index) => {
        if(index===0) start += food
        else{
            start += ` and ${food}`
        }
    })
    return start
}
function getDislikeFood(foodArr) {
    let start = ``
    foodArr.forEach((food, index) => {
        if(index===0) start += food
        else{
            start += ` and ${food}`
        }
    })
    return start
}

