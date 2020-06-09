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

const enableValidation = (options) => {        //функция валидации
    //находим формы и делаем из них подобие массива                                               
    const formList = Array.from(document.querySelectorAll(options.formSelector));
    //перебираем массив форм   
    formList.forEach( formElement => {
        //находим кнопку отправки формы
        const submitButtons = formElement.querySelector(options.submitButtonSelector);  
             //проверка кнопки на валидность
        formElement.addEventListener('input', () => handleFormInput(formElement, submitButtons, options));
        //создаем псевдомассив инпутов       
        const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
             //вешаем на каждый инпут событие 'Инпут' и проверяем форму его на валидность.
         inputElements.forEach(input => {                                      
             input.addEventListener('input', evt => {                          
                 checkErrors(evt, options);                    
            });            
        });
        //пользовательское событие через  dispatchEvent, позволяющие стирать ошибки и проверять на валидность при повторном открытии формы
        formElement.addEventListener('clearForm', evt  => {
            inputElements.forEach(input => {
                hideInput(input, options);
                handleFormInput(formElement, submitButtons, options);
            });
        });
    });   
}




        

