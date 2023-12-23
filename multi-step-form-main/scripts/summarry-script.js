let summaryContainer = document.querySelector('.summary-container')
let planSummary = document.querySelector('.summary-container .plan-summary')
let addOnSummary = document.querySelector('.summary-container .addon-summary')
let totalSummary = document.querySelector('.final-price')

function summaryPlan(title, price) {
    
    planSummary.innerHTML += `<div id='plan-title-summary'><p>${title} </p> 
    <p>Change</p></div>`
    planSummary.innerHTML += `<p id='plan-price-summary'>$${price}</p>`
    let planTitle = document.querySelector('#plan-title-summary p:nth-of-type(1)')
    let planPrice = document.querySelector('#plan-price-summary')
    if (period.checked) {
        planTitle.insertAdjacentHTML("beforeend", '<span>(Yearly)</span>')
        planPrice.insertAdjacentHTML("beforeend", '<span>/yr</span>')
    }
    else {
        planTitle.insertAdjacentHTML("beforeend", '<span>(Monthly)</span>')
        planPrice.insertAdjacentHTML("beforeend", '<span>/mo</span>')
    }
}

function summaryAddOn(title, price,index) {
    
    addOnSummary.innerHTML += `<p class='addon-title-summary'>${title}</p>`
    addOnSummary.innerHTML += `<p class='addon-price-summary' id='price${index}'>${price}</p>`

    let addonPriceSummary = document.querySelector(`#price${index}`)
    console.log(addonPriceSummary)
    addonPriceSummary.insertAdjacentHTML("afterbegin", '<span>+$</span>')
    let addOnPricePeriod = period.checked ? '/yr':'/mo'
    addonPriceSummary.insertAdjacentHTML("beforeend",`<span>${addOnPricePeriod}</span>`)
}
function totalPrice(){
    
    let titlePeriod = period.checked?'(per year)':'(per month)'
    let totalPeriod = period.checked?'/yr':'/mo'
    totalSummary.innerHTML+=`<p>Total ${titlePeriod}</p>`
    totalSummary.innerHTML+=`<p>+$${total}${totalPeriod}</p>`
}

function toChange(){
    let change = document.querySelector('#plan-title-summary p:nth-of-type(2)')
    change.addEventListener('click',()=>{
        planSummary.innerHTML = ''
        addOnSummary.innerHTML = ''
        totalSummary.innerHTML =''
        total = 0
        tabs[currentTab].style.display ='none'
        currentTab = currentTab -2
        showTab(currentTab)
    })
}
