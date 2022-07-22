import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const LOCAL_STORAGE_KEY = "feedback-form-state";

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

if(localStorage.getItem(LOCAL_STORAGE_KEY))
fillFormCurrentData();

function onFormSubmit(e){
    e.preventDefault();
    e.currentTarget.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY)
}

function onFormInput(e) {
    const formData = new FormData(formEl);
    const formDataJSON = JSON.stringify(Object.fromEntries(formData))
    localStorage.setItem(LOCAL_STORAGE_KEY, formDataJSON)
}

function fillFormCurrentData (){
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    try {
        const savedDataObj = JSON.parse(savedData);
        
        Object.keys(savedDataObj).forEach(key => formEl[key].value = savedDataObj[key])
       
    } catch (error) {
        console.log(error.name); // "SyntaxError"
        console.log(error.message); // Unexpected token W in JSON at position 0
      }


    // if(savedData)
    // console.log(savedData);
}
