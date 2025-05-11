// funcionalidad.js

const datosDemanda = [];

function agregarDato() {
    const demanda = parseInt(document.getElementById("demanda").value);
    const frecuencia = parseInt(document.getElementById("frecuencia").value);

    if (isNaN(demanda) || isNaN(frecuencia) || demanda < 0 || frecuencia <= 0) {
        alert("Ingrese valores válidos para demanda y frecuencia.");
        return;
    }

    datosDemanda.push({ demanda, frecuencia });
    actualizarTabla();
    limpiarCampos();
}

function actualizarTabla() {
    const tabla = document.getElementById("tablaDatos");
    tabla.innerHTML = "";
    datosDemanda.forEach(item => {
        tabla.innerHTML += `<tr><td>${item.demanda}</td><td>${item.frecuencia}</td></tr>`;
    });
}

function limpiarCampos() {
    document.getElementById("demanda").value = "";
    document.getElementById("frecuencia").value = "";
}

function simular() {
    const diasSimulacion = parseInt(document.getElementById("diasSimulacion").value);

    if (datosDemanda.length === 0) {
        alert("Ingrese al menos un dato de demanda antes de simular.");
        return;
    }

    if (isNaN(diasSimulacion) || diasSimulacion <= 0) {
        alert("Ingrese un número válido de días a simular.");
        return;
    }

    const resultados = ejecutarSimulacion(datosDemanda, diasSimulacion);
    const estadisticas = calcularResultadosEstadisticos(resultados);

    mostrarResultados(estadisticas);
    graficarResultados(resultados);
}

function mostrarResultados(estadisticas, resultados) {
    const resultadoDiv = document.getElementById("resultadoSimulacion");
    resultadoDiv.innerHTML = `
        <p><strong>Demanda Total:</strong> ${estadisticas.totalDemanda}</p>
        <p><strong>Demanda Promedio:</strong> ${estadisticas.demandaPromedio}</p>
        <p><strong>Demanda Promedio Redondeada:</strong> ${estadisticas.demandaPromedioRedondeada}</p>
    `;

    mostrarTablaResultados(resultados);
}

function mostrarTablaResultados(resultados) {
    const tabla = document.getElementById("tablaResultados");
    tabla.innerHTML = "";

    resultados.forEach((demanda, index) => {
        tabla.innerHTML += `<tr><td>${index + 1}</td><td>${demanda}</td></tr>`;
    });
}

function simular() {
    const diasSimulacion = parseInt(document.getElementById("diasSimulacion").value);

    if (datosDemanda.length === 0) {
        alert("Ingrese al menos un dato de demanda antes de simular.");
        return;
    }

    if (isNaN(diasSimulacion) || diasSimulacion < 100) {
        alert("Debe ingresar al menos 100 días a simular para cumplir los requisitos.");
        return;
    }

    const resultados = ejecutarSimulacion(datosDemanda, diasSimulacion);
    const estadisticas = calcularResultadosEstadisticos(resultados);

    mostrarResultados(estadisticas, resultados);
}


function graficarResultados(resultados) {
    const ctx = document.getElementById("graficoResultados").getContext("2d");

    const conteo = {};
    resultados.forEach(valor => {
        conteo[valor] = (conteo[valor] || 0) + 1;
    });

    const labels = Object.keys(conteo);
    const data = Object.values(conteo);

    if (window.miGrafico instanceof Chart) {
        window.miGrafico.destroy();
    }

    window.miGrafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Frecuencia de Demanda",
                data: data,
                backgroundColor: "#ffc107"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: "Resultados de la Simulación" }
            }
        }
    });
}
