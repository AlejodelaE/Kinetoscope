// Se ejecuta cuando el documento HTML ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded', function () {

    // Obtener referencias a los elementos del DOM
    const form = document.querySelector('.row.g-3');
    const inputName = document.getElementById('input_name');
    const inputLastname = document.getElementById('input_lastname');
    const inputEmail = document.getElementById('inputEmail');
    const inputCountry = document.getElementById('inputCountry');
    const inputCity = document.getElementById('inputCity');
    const opinion1 = document.getElementById('FormOpinion1');
    const opinion2 = document.getElementById('FormOpinion2');
    const submitButton = document.querySelector('button[type="submit"]');
    const resetButton = document.querySelector('button[type="reset"]');

    // Cargar datos del localStorage al cargar la página
    const storedData = JSON.parse(localStorage.getItem('formData'));
    if (storedData) {
        // Si hay datos almacenados en el localStorage, asigna esos valores a los campos del formulario
        inputName.value = storedData.name || '';
        inputLastname.value = storedData.lastname || '';
        inputEmail.value = storedData.email || '';
        inputCountry.value = storedData.country || '';
        inputCity.value = storedData.city || '';
        opinion1.value = storedData.opinion1 || '';
        opinion2.value = storedData.opinion2 || '';
    }

    // Obtén tus credenciales de Email JS
    const emailJsUserId = 'V1R7l_ls0MrGh3gnO';
    const emailJsServiceId = 'service_3e7pg9s';
    const emailJsTemplateId = 'template_ulibina';

    // Función para guardar datos en localStorage
    function saveData() {
        // Crea un objeto con los datos del formulario y lo guarda en el localStorage
        const formData = {
            name: inputName.value,
            lastname: inputLastname.value,
            email: inputEmail.value,
            country: inputCountry.value,
            city: inputCity.value,
            opinion1: opinion1.value,
            opinion2: opinion2.value
        };
        localStorage.setItem('formData', JSON.stringify(formData));
    }

    // Función para mostrar los datos en el DOM
    function mostrarDatos() {
        // Selecciona elementos en el DOM y asigna los valores de los campos del formulario
        const resultNombre = document.getElementById('result_nombre');
        const resultApellido = document.getElementById('result_apellido');
        const resultCorreo = document.getElementById('result_correo');
        const resultPais = document.getElementById('result_pais');
        const resultCiudad = document.getElementById('result_ciudad');
        const resultOpinion1 = document.getElementById('result_opinion1');
        const resultOpinion2 = document.getElementById('result_opinion2');

        resultNombre.textContent = inputName.value;
        resultApellido.textContent = inputLastname.value;
        resultCorreo.textContent = inputEmail.value;
        resultPais.textContent = inputCountry.value;
        resultCiudad.textContent = inputCity.value;
        resultOpinion1.textContent = opinion1.value;
        resultOpinion2.textContent = opinion2.value;
    }

    // Función para enviar el formulario mediante Email JS
    async function enviarCorreo() {
        try {
            // Realiza una solicitud POST a la API de Email JS con los datos del formulario
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${emailJsUserId}`
                },
                body: JSON.stringify({
                    service_id: emailJsServiceId,
                    template_id: emailJsTemplateId,
                    user_id: emailJsUserId,
                    template_params: {
                        name: inputName.value,
                        lastname: inputLastname.value,
                        email: inputEmail.value,
                        country: inputCountry.value,
                        city: inputCity.value,
                        opinion1: opinion1.value,
                        opinion2: opinion2.value
                    }
                })
            });

            if (response.ok) {
                console.log('Correo enviado con éxito');
            } else {
                console.error('Error al enviar el correo');
            }
        } catch (error) {
            console.error('Error en la petición fetch:', error);
        }
    }

    // Función para mostrar un mensaje de éxito con SweetAlert
    function mostrarMensajeExitoso() {
        Swal.fire({
            icon: 'success',
            title: 'Formulario enviado',
            text: '¡Gracias por enviar el formulario!'
        });
    }

    // Evento de envío del formulario
    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario (no se recargará la página)
        saveData(); // Guarda los datos en el localStorage
        mostrarDatos(); // Muestra los datos en el DOM
        await enviarCorreo(); // Llama a la función para enviar el correo de manera asíncrona
        mostrarMensajeExitoso(); // Muestra un mensaje de éxito con SweetAlert
    });

    // Evento de reset del formulario
    form.addEventListener('reset', function () {
        localStorage.removeItem('formData'); // Elimina los datos del localStorage
    });
});