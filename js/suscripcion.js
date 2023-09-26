// Algoritmo condicional para calcular pagos en cuotas
function calcularCuotas(monto, cuotas) {
    if (cuotas > 0) {
        return monto / cuotas;
    } else {
        return 0;
    }
}

// Algoritmo utilizando un ciclo para aplicar impuestos y descuentos
function calcularFinal(monto, impuestos, descuentos) {
    let total = monto;
    for (let i = 0; i < impuestos.length; i++) {
        total *= (1 + impuestos[i]);
    }
    for (let i = 0; i < descuentos.length; i++) {
        total *= (1 - descuentos[i]);
    }
    return total;
}

// Código para interactuar con los elementos HTML
function calcular() {
    const monto = parseFloat(document.getElementById('monto').value);
    const cuotas = parseInt(document.getElementById('cuotas').value);

    const montoPorCuota = calcularCuotas(monto, cuotas);

    const impuestos = [0.1, 0.05]; // Ejemplo de impuestos
    const descuentos = [0.02];    // Ejemplo de descuentos

    const montoFinal = calcularFinal(montoPorCuota, impuestos, descuentos);

    document.getElementById('montoCuota').textContent = montoPorCuota.toFixed(2);
    document.getElementById('montoFinal').textContent = montoFinal.toFixed(2);
}