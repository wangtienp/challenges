let errorText = document.querySelectorAll('.info-container p span')
let errorInput = document.querySelectorAll('.info-container input') //for the input



//regex for inputs
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^01\d{8,9}$/
//error text
const invalidEmail = 'Invalid Email'
const invalidPhone = 'Invalid Phone'
const fieldRequired = 'This field is required'
let validatePersonalInfo = false
let emptyPersonalInfo = false

//invalid email
errorInput[1].addEventListener('input',(e)=>{
    if((e.target.value).match(emailRegex)){
        errorInput[1].classList.remove('inputerror')
        errorText[1].classList.remove('inputerror')
        validatePersonalInfo =true
        
    }
    else{
        errorInput[1].classList.add('inputerror')
        errorText[1].textContent = invalidEmail
        errorText[1].classList.add('inputerror')
        validatePersonalInfo = false
        
    }
    
})
//invalid phone
errorInput[2].addEventListener('input',(e)=>{
    if((e.target.value).match(phoneRegex)){
        errorInput[2].classList.remove('inputerror')
        errorText[2].classList.remove('inputerror')
        validatePersonalInfo =true
        
    }
    else{
        errorInput[2].classList.add('inputerror')
        errorText[2].textContent = invalidPhone
        errorText[2].classList.add('inputerror')
        validatePersonalInfo = false
        
    }
})
//field required
function fieldIsNotEmpty(){
    errorInput.forEach((input,index)=>{
        if(input.value.trim() ===''){
            input.classList.add('error')
            errorText[index].classList.add('error')
            errorText[index].textContent = fieldRequired
            
            
        }else{
            input.classList.remove('error')
            errorText[index].classList.remove('error')
            
        }
    })
    for(const error of errorInput){
        if(error.classList.contains('error')){
            emptyPersonalInfo = false
            break
        }else{
            emptyPersonalInfo = true
        }
    }
    return emptyPersonalInfo
}



