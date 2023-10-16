// --- Arrays ---
const catalogo = [
    {
        nombre: "Plan Básico",
        precio: 7.99,
    },
    {
        nombre: "Plan Estándar",
        precio: 10.99,
    },
    {
        nombre: "Plan Premium",
        precio: 13.99,
    }
];

// --- Objetos JS ---
const servicioStreaming = {
    nombre: "MiServicio",
    impuestos: [0.1, 0.05],
    descuentos: [0.02],
};

// --- Métodos de búsqueda y filtrado sobre el Array ---
function buscarPlan(nombre) {
    const planEncontrado = catalogo.find(plan => plan.nombre === nombre);

    if (planEncontrado) {
        console.log(`Plan encontrado: ${planEncontrado.nombre}`);
        console.log(`Precio: $${planEncontrado.precio.toFixed(2)}`);
        alert(`Plan encontrado: ${planEncontrado.nombre}\nPrecio: $${planEncontrado.precio.toFixed(2)}`);
    } else {
        console.log(`Plan no encontrado.`);
        alert(`Plan no encontrado.`);
    }
}

// --- Función para calcular cuotas ---
function calcularCuotas(monto, cuotas) {
    if (cuotas > 0) {
        return monto / cuotas;
    } else {
        return 0;
    }
}

// --- Función para calcular el monto final con impuestos y descuentos ---
function calcularFinal(monto, impuestos, descuentos) {
    let total = monto;
    let impuestoTotal = 0;
    let descuentoTotal = 0;

    for (let i = 0; i < impuestos.length; i++) {
        const impuesto = monto * impuestos[i];
        impuestoTotal += impuesto;
        total += impuesto;
    }

    for (let i = 0; i < descuentos.length; i++) {
        const descuento = monto * descuentos[i];
        descuentoTotal += descuento;
        total -= descuento;
    }

    return { total, impuestoTotal, descuentoTotal };
}

// --- Función para suscribirse a un plan ---
function suscribirse(planIndex, cuotas) {
    const plan = catalogo[planIndex];

    if (plan) {
        const montoPorCuota = calcularCuotas(plan.precio, cuotas);
        const resultado = calcularFinal(montoPorCuota, servicioStreaming.impuestos, servicioStreaming.descuentos);

        // --- Impresión en la consola ---
        console.log(`El monto por cuota del plan ${plan.nombre} es: $${montoPorCuota.toFixed(2)}`);
        console.log(`El monto final del plan ${plan.nombre} es: $${resultado.total.toFixed(2)}`);
        console.log(`Impuesto: $${resultado.impuestoTotal.toFixed(2)}`);
        console.log(`Descuento: $${resultado.descuentoTotal.toFixed(2)}`);

        // --- Alerta con los resultados ---
        alert(`El monto final del plan ${plan.nombre} es: $${resultado.total.toFixed(2)}\nImpuesto: $${resultado.impuestoTotal.toFixed(2)}\nDescuento: $${resultado.descuentoTotal.toFixed(2)}`);
    } else {
        alert("Plan no válido");
    }
}