
let currentTab = 0
let total = 0
const tabs = document.querySelectorAll('.tab')
const form = document.querySelector('#plan-form')
const nextBtn = document.querySelector('#buttons #nextBtn')
const prevBtn = document.querySelector('#buttons #prevBtn')

form.addEventListener('submit', (e) => {
    e.preventDefault();
});
let finalPlan = {}

//showing the current tab
function showTab(n) {
    let next = document.querySelector('#buttons #nextBtn')
    if (n === 4) {
        tabs[n].style.display = 'flex'
    }
    else
        tabs[n].style.display = 'block'
    //if is the first tab
    if (n === 0) {
        document.getElementById('prevBtn').style.display = 'none'
    } else {
        document.getElementById('prevBtn').style.display = 'inline'
    }
    //if is the submit tab
    if (n === (tabs.length - 2)) {

        next.textContent = 'Confirm'
        next.classList.add('confirm')

    } else {
        next.textContent = 'Next Step'
        next.classList.remove('confirm')
    }
    //if is the gratitude tab
    if (n == (tabs.length - 1)) {
        document.getElementById('buttons').style.display = 'none'
    } else {
        document.getElementById('buttons').style.display = 'grid'
    }
    showCircle(n)
}

//show the sidebar circle color
function showCircle(n) {
    let circles = document.querySelectorAll('.circle')
    //if is the gratitude tab which means the index = circle.length
    if (n >= circles.length) {
        n = circles.length - 1
    }
    circles.forEach((circle, index) => {
        if (index === n) {
            circle.classList.add('active')
        }
        else {
            circle.classList.remove('active')
        }
    })
}

showTab(currentTab)

nextBtn.addEventListener('click', () => {
    switch (currentTab) {
        case 0:
            if (fieldIsNotEmpty() && validatePersonalInfo) {
                tabs[currentTab].style.display = 'none'
                currentTab++
                showTab(currentTab)
            }
            break
        case 1:
            finalPlan = getPlan()
            total += finalPlan.price
            tabs[currentTab].style.display = 'none'
            currentTab++
            showTab(currentTab)

            break
        case 2:

            let finalAddOn = getAddOn()
            finalAddOn.forEach(addon => total += addon.price)
            tabs[currentTab].style.display = 'none'
            currentTab++
            showTab(currentTab)
            console.log(total)
            summaryPlan(finalPlan.name, finalPlan.price)
            finalAddOn.forEach((addon, index) => {
                summaryAddOn(addon.title, addon.price, index)
            })
            totalPrice()
            toChange()
            break
        case 3:
            tabs[currentTab].style.display = 'none'
            currentTab++
            showTab(currentTab)
    }

})
prevBtn.addEventListener('click', () => {
    switch (currentTab) {
        case 3:
            let finalAddOn = getAddOn()
            finalAddOn.forEach(addon => total -= addon.price)
            planSummary.innerHTML = ''
            addOnSummary.innerHTML = ''
            totalSummary.innerHTML = ''
            tabs[currentTab].style.display = 'none'
            currentTab--
            showTab(currentTab)
            break
        case 2:
            total -= finalPlan.price
            tabs[currentTab].style.display = 'none'
            currentTab--
            showTab(currentTab)
            break
        default:
            tabs[currentTab].style.display = 'none'
            currentTab--
            showTab(currentTab)
            break


    }
})



