const showInput = (input, options) => {                //Выдаём ошибку
    const error = errorSpan(input);
    error.textContent = input.validationMessage;
    input.classList.add(options.inputErrorClass);
}

const hideInput = (input, options) => {              //Убираем ошибку
    const error = errorSpan(input);
    error.textContent = '';
    input.classList.remove(options.inputErrorClass);
   
}

const errorSpan = (input) => {                      //span Ошибки
    return document.querySelector(`#${input.id}-error`)
}

function checkErrors (evt, options) {                  // Проверка инпута на валидность
    const inputs = evt.target;
    console.log(inputs.checkValidity());    
    if (inputs.checkValidity()) {
        hideInput(inputs, options);
    } else {
        showInput(inputs, options);
    }
}

function handleFormInput (formElement, submitButton, options) {   //проверка сабмита на валидность
    const hasErrors = !formElement.checkValidity();
    submitButton.disabled = hasErrors;
    submitButton.classList.toggle(options.inactiveButtonClass, hasErrors);
}

const enableValidation = (options) => {                                                  //Валидация
    const formList = Array.from(document.querySelectorAll(options.formSelector));   
    formList.forEach( formElement => {
        const submitButtons = formElement.querySelector(options.submitButtonSelector);  

        formElement.addEventListener('input', () => handleFormInput(formElement, submitButtons, options));       
        const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector)); 
         inputElements.forEach(input => {                                      
             input.addEventListener('input', evt => {                          
                 checkErrors(evt, options);                    
            });            
        });
    });   
}




        

