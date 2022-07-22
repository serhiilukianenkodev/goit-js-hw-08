import throttle from 'lodash.throttle';
import '../css/common.css'
import '../css/03-feedback.css'

const formEl = document.querySelector('.feedback-form');

const LOCAL_STORAGE_KEY = "feedback-form-state";

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

if(savedData)
fillFormCurrentData();

function onFormSubmit(e){
    e.preventDefault();
    e.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
    localStorage.removeItem(LOCAL_STORAGE_KEY)
}

function onFormInput(e) {
    const formData = new FormData(formEl);
    const formDataJSON = JSON.stringify(Object.fromEntries(formData))
    localStorage.setItem(LOCAL_STORAGE_KEY, formDataJSON)
}

function fillFormCurrentData (){

    try {
        const savedDataObj = JSON.parse(savedData);
        
        Object.keys(savedDataObj).forEach(key => formEl[key].value = savedDataObj[key])
       
    } catch (error) {
        console.log(error.name); // "SyntaxError"
        console.log(error.message); // Unexpected token W in JSON at position 0
      }

}
