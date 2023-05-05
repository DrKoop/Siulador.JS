document.addEventListener('DOMContentLoaded', function(){

const valoresFormulario = {
    email : '',
    asunto : '',
    mensaje : '',
}

//Selectores input's
const inputEmail = document.querySelector('#email');
const inputAsunto = document.querySelector('#asunto');
const inputMensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#formulario');
const btnSubmit = document.querySelector('#formulario button[type="submit"]');
const btnReset = document.querySelector('#formulario button[type="reset"]');
const spinner = document.querySelector('#spinner');


//Asignar Eventos
inputEmail.addEventListener('input', validar);
inputAsunto.addEventListener('input', validar);
inputMensaje.addEventListener('input', validar);

formulario.addEventListener('submit', simulacionEnvio);

btnReset.addEventListener('click', function(e){
    e.preventDefault();
    resetFormulario();
});

function simulacionEnvio(e){
    e.preventDefault();
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
        spinner.classList.remove('flex');
        spinner.classList.add('hidden');
        resetFormulario();

        const alertaExito = document.createElement('P');
        alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', -'text-center', 'rounded-lg', 'mt-10', 'text-sm', 'font-bold', 'uppercase');
        alertaExito.textContent = 'Mensaje Envíado Correctamente';
        formulario.appendChild(alertaExito);
        setTimeout(() => {
            alertaExito.remove();
        }, 3000);
    }, 3000);

}

function validar(e){
    //console.log(e.target.parentElement)
    if( e.target.value.trim() === "" ){
        customAlert(`El Campo ${e.target.id} es Obligatorio.`, e.target.parentElement);
        valoresFormulario[e.target.name] = '';
        comprobarEmail();
        return
    }

    if( e.target.id === 'email' && !validarCampos(e.target.value)){
        customAlert('El email no es valido', e.target.parentElement);
        valoresFormulario[e.target.name] = '';
        comprobarEmail();
        return
    }
    
    removeAlert(e.target.parentElement);

    //Asignar Valores
    valoresFormulario[e.target.name] = e.target.value.trim().toLowerCase();
    comprobarEmail();
}


function customAlert( mensaje, elementDOM ){
    removeAlert(elementDOM);
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
    elementDOM.appendChild(error);
}

function removeAlert(elementDOM){
    //Evitar alertas duplicadas
    const alerta = elementDOM.querySelector('.bg-red-600');
    if ( alerta ){
        alerta.remove();
    }
}


function validarCampos(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    const resultado = regex.test(email);
    return resultado;
}


function comprobarEmail(){

    if(Object.values(valoresFormulario).includes('')){
        btnSubmit.classList.add('opacity-50');
        btnSubmit.disabled = true;
        return
    }
    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;
}

function resetFormulario(){
    valoresFormulario.email = '';
    valoresFormulario.asunto = '';
    valoresFormulario.mensaje = '';
    formulario.reset();
    comprobarEmail();
}



});