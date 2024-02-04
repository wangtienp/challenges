const checkboxes = document.querySelectorAll(`input[type = 'checkbox']`)
let startIndex, targetIndex
console.log(checkboxes)
checkboxes.forEach((checkbox, index) => checkbox.addEventListener('click', (e) => {
    const checked = e.target.checked

    if (checked && e.shiftKey) {
        targetIndex = index
        if (startIndex === undefined) startIndex = targetIndex
        if (startIndex === targetIndex) return
        shiftToCheck(startIndex, targetIndex)

    }
    else if (!checked && e.shiftKey) {
        targetIndex = index
        if (startIndex === targetIndex) return
        shiftToUncheck(startIndex, targetIndex)

    }
    startIndex = index
}))

function shiftToCheck(start, target) {
    const max = Math.max(start, target)
    const min = Math.min(start, target)

    for (let i = min; i <= max; i++) {
        checkboxes[i].checked = true
    }
}
function shiftToUncheck(start, target) {
    const max = Math.max(start, target)
    const min = Math.min(start, target)

    for (let i = min; i <= max; i++) {
        checkboxes[i].checked = false
    }
}
