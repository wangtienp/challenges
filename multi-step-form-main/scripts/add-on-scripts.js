let addons = document.querySelectorAll('.addon')
let addOnCheckbox = document.querySelectorAll('.addon input[type="checkbox"]')
let addOnPrice = Array.from(document.querySelectorAll('.addon-price-number'))
let addOnTitle = document.querySelectorAll('.addon .desc p:nth-of-type(1)')
let addonPeriod = document.querySelectorAll('.addon-price span:nth-of-type(2)')
let monthlyAddOnPrice = addOnPrice.map(price => parseInt(price.textContent))
let yearlyAddOnPrice = addOnPrice.map((price) => {
    return parseInt(price.textContent) * 10
})
const selectedAddOn = []


function onLoadAddOn() {
    period.addEventListener('change', () => {
        if (period.checked) {

            addOnPrice.forEach((price, index) => {
                price.textContent = yearlyAddOnPrice[index]
                addonPeriod[index].textContent = '/yr'
            })
        } else {
            addOnPrice.forEach((price, index) => {
                price.textContent = monthlyAddOnPrice[index]
                addonPeriod[index].textContent = '/mo'

            })
        }
    })

}
onLoadAddOn()



addons.forEach((addon, index) => {
    addon.addEventListener('click', () => {
        let isChecked = addons[index].classList.toggle('checked')
        if (isChecked) {

            addOnCheckbox[index].checked = true
        } else {
            addOnCheckbox[index].checked = false
        }
    })
})

function getAddOn() {
    selectedAddOn.length = 0
    addOnCheckbox.forEach((checkbox, index) => {

        if (checkbox.checked) {
            let newAddOn = { title: addOnTitle[index].textContent, price: parseInt(addOnPrice[index].textContent) }
            selectedAddOn.push(newAddOn)
        }
    })
    console.log(selectedAddOn)
    return selectedAddOn
}