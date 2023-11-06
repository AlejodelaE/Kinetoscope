document.addEventListener('DOMContentLoaded', function() {
    // Cuando el documento HTML ha sido completamente cargado y parseado, ejecuta esta función.

    // Obtener referencias a los elementos del DOM
    const form = document.querySelector('.row.g-3'); // Selecciona el formulario
    const inputName = document.getElementById('input_name'); // Selecciona el input de nombre
    const inputLastname = document.getElementById('input_lastname'); // Selecciona el input de apellido
    const inputEmail = document.getElementById('inputEmail'); // Selecciona el input de correo electrónico
    const inputCountry = document.getElementById('inputCountry'); // Selecciona el input de país
    const inputCity = document.getElementById('inputCity'); // Selecciona el input de ciudad
    const opinion1 = document.getElementById('FormOpinion1'); // Selecciona el textarea de opinión 1
    const opinion2 = document.getElementById('FormOpinion2'); // Selecciona el textarea de opinión 2
    const submitButton = document.querySelector('button[type="submit"]'); // Selecciona el botón de enviar
    const resetButton = document.querySelector('button[type="reset"]'); // Selecciona el botón de resetear

    // Cargar datos del localStorage al cargar la página
    const storedData = JSON.parse(localStorage.getItem('formData')); // Intenta obtener datos del localStorage
    if (storedData) {
        // Si hay datos almacenados en el localStorage
        inputName.value = storedData.name || ''; // Asigna el valor del nombre (o un string vacío si no existe) al input
        inputLastname.value = storedData.lastname || ''; // Asigna el valor del apellido (o un string vacío si no existe) al input
        inputEmail.value = storedData.email || ''; // Asigna el valor del correo electrónico (o un string vacío si no existe) al input
        inputCountry.value = storedData.country || ''; // Asigna el valor del país (o un string vacío si no existe) al input
        inputCity.value = storedData.city || ''; // Asigna el valor de la ciudad (o un string vacío si no existe) al input
        opinion1.value = storedData.opinion1 || ''; // Asigna el valor de la opinión 1 (o un string vacío si no existe) al textarea
        opinion2.value = storedData.opinion2 || ''; // Asigna el valor de la opinión 2 (o un string vacío si no existe) al textarea
    }

    // Función para guardar datos en localStorage
    function saveData() {
        const formData = {
            name: inputName.value,
            lastname: inputLastname.value,
            email: inputEmail.value,
            country: inputCountry.value,
            city: inputCity.value,
            opinion1: opinion1.value,
            opinion2: opinion2.value
        };
        localStorage.setItem('formData', JSON.stringify(formData)); // Convierte el objeto a JSON y lo guarda en el localStorage
    }

    // Función para mostrar los datos en el DOM
    function mostrarDatos() {
        const resultNombre = document.getElementById('result_nombre'); // Selecciona el elemento para mostrar el nombre
        const resultApellido = document.getElementById('result_apellido'); // Selecciona el elemento para mostrar el apellido
        const resultCorreo = document.getElementById('result_correo'); // Selecciona el elemento para mostrar el correo electrónico
        const resultPais = document.getElementById('result_pais'); // Selecciona el elemento para mostrar el país
        const resultCiudad = document.getElementById('result_ciudad'); // Selecciona el elemento para mostrar la ciudad
        const resultOpinion1 = document.getElementById('result_opinion1'); // Selecciona el elemento para mostrar la opinión 1
        const resultOpinion2 = document.getElementById('result_opinion2'); // Selecciona el elemento para mostrar la opinión 2

        // Asigna los valores de los elementos a partir de los inputs y textareas
        resultNombre.textContent = inputName.value;
        resultApellido.textContent = inputLastname.value;
        resultCorreo.textContent = inputEmail.value;
        resultPais.textContent = inputCountry.value;
        resultCiudad.textContent = inputCity.value;
        resultOpinion1.textContent = opinion1.value;
        resultOpinion2.textContent = opinion2.value;
    }

    // Evento de envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario (no se recargará la página)
        saveData(); // Guarda los datos en el localStorage
        mostrarDatos(); // Muestra los datos en el DOM
        alert('Formulario enviado correctamente.'); // Muestra un mensaje de alerta
    });

    // Evento de reset del formulario
    form.addEventListener('reset', function() {
        localStorage.removeItem('formData'); // Elimina los datos del localStorage
    });
});
