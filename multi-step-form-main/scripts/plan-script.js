
let period =document.querySelector('#period-checkbox')
let plans = document.querySelectorAll('.plan')
let month = document.querySelector('#month')
let year = document.querySelector('#year')
let prices = document.querySelectorAll('.plan-price')
let periodPrices = document.querySelectorAll('.price-period')//to get the last element of the plans, but actually can do it by select p:last-of-type
let slashPeriod = document.querySelectorAll('.price-period span:nth-of-type(2)')
let plansContainer = document.querySelector('.plan-container')
let radioPrices = document.querySelectorAll('input[name = "rGroup"]')
let plansName = document.querySelectorAll('input[name = "rGroup"]+ .radio .plan-type')
let monthlyPriceArray = []
prices.forEach((price) => {
    monthlyPriceArray.push(parseInt(price.innerHTML))
})
let yearlyPriceArray = monthlyPriceArray.map(price => price * 10)
let free2Months = '2 months free'
console.log(slashPeriod[0].textContent)


// if toggled to year and month then will change the price
period.addEventListener('change', () => {
    if (period.checked) {
        year.classList.add('selected')
        month.classList.remove('selected')
        slashPeriod.forEach(slash => slash.textContent = '/yr')
        prices.forEach((price, index) => price.innerText = yearlyPriceArray[index])
        periodPrices.forEach(price => price.insertAdjacentHTML("afterend",
            `<p class='free'>${free2Months}</p>`))

    } else {
        month.classList.add('selected')
        year.classList.remove('selected')
        slashPeriod.forEach(slash => slash.textContent = '/mo')
        prices.forEach((price, index) => price.innerText = monthlyPriceArray[index])
        let removeFree =document.querySelectorAll('.free')
        removeFree.forEach(free=>free.innerHTML='')
    }
})
let planPrice = 0
let planName =''
function getPlan() {
    radioPrices.forEach((radio,index )=>{
        if (radio.checked) {
            planPrice = parseInt(radio.value)
            planName = plansName[index].textContent
            if(period.checked){
                planPrice = planPrice *10
            }
        }
    })
   let obj ={
    price:planPrice,
    name:planName
   }
   return obj
    
}
