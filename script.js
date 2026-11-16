// URL del endpoint de departamentos de la API de Colombia
const URL_DEPARTAMENTOS = 'https://api-colombia.com/api/v1/Department';

// Referencias a los elementos del DOM
const mensajeCarga = document.getElementById('mensaje-carga');
const mensajeError = document.getElementById('mensaje-error');
const seccionRegiones = document.getElementById('seccion-regiones');
const contenedorRegiones = document.getElementById('contenedor-regiones');
const contenedorDepartamentos = document.getElementById('contenedor-departamentos');

// Mapa de nombres de regiones según el regionId que entrega la API de Colombia
const nombresRegiones = {
    1: 'Caribe',
    2: 'Pacífico',
    3: 'Orinoquía',
    4: 'Amazonía',
    5: 'Andina',
    6: 'Insular'
};

// Función para obtener el nombre de la región de un departamento
function obtenerNombreRegion(departamento) {
    if (departamento.region && departamento.region.name) {
        return departamento.region.name;
    }
    return nombresRegiones[departamento.regionId] || 'Sin región';
}

// Función para mostrar el conteo de departamentos por región (Extra)
function mostrarConteoPorRegion(departamentos) {
    const conteo = {};

    // Recorremos todos los departamentos para contar cuántos hay en cada región
    departamentos.forEach(function (departamento) {
        const region = obtenerNombreRegion(departamento);
        if (conteo[region]) {
            conteo[region] = conteo[region] + 1;
        } else {
            conteo[region] = 1;
        }
    });

    // Limpiamos el contenedor y creamos los elementos en el DOM
    contenedorRegiones.innerHTML = '';

    for (const region in conteo) {
        const divRegion = document.createElement('div');
        divRegion.className = 'item-region';

        const tituloRegion = document.createElement('strong');
        tituloRegion.textContent = region + ': ';

        const cantidad = document.createElement('span');
        cantidad.textContent = conteo[region] + ' departamentos';

        divRegion.appendChild(tituloRegion);
        divRegion.appendChild(cantidad);
        contenedorRegiones.appendChild(divRegion);
    }

    seccionRegiones.classList.remove('oculto');
}

// Función para crear y mostrar las tarjetas de los departamentos en el DOM
function mostrarDepartamentos(departamentos) {
    contenedorDepartamentos.innerHTML = '';

    departamentos.forEach(function (departamento) {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'tarjeta';

        const nombre = document.createElement('h3');
        nombre.textContent = departamento.name;

        const region = document.createElement('p');
        region.innerHTML = '<strong>Región:</strong> ' + obtenerNombreRegion(departamento);

        const poblacion = document.createElement('p');
        const poblacionFormateada = departamento.population
            ? departamento.population.toLocaleString('es-CO') + ' habitantes'
            : 'No disponible';
        poblacion.innerHTML = '<strong>Población:</strong> ' + poblacionFormateada;

        const superficie = document.createElement('p');
        const superficieFormateada = departamento.surface
            ? departamento.surface.toLocaleString('es-CO') + ' km²'
            : 'No disponible';
        superficie.innerHTML = '<strong>Superficie:</strong> ' + superficieFormateada;

        const descripcion = document.createElement('p');
        descripcion.className = 'descripcion';
        descripcion.textContent = departamento.description || 'Sin descripción disponible.';

        // Agregamos cada elemento a la tarjeta
        tarjeta.appendChild(nombre);
        tarjeta.appendChild(region);
        tarjeta.appendChild(poblacion);
        tarjeta.appendChild(superficie);
        tarjeta.appendChild(descripcion);

        // Agregamos la tarjeta al contenedor principal
        contenedorDepartamentos.appendChild(tarjeta);
    });
}

// Consumo de la API con fetch y manejo de errores con catch
fetch(URL_DEPARTAMENTOS)
    .then(function (respuesta) {
        if (!respuesta.ok) {
            throw new Error('No se pudo obtener la información de los departamentos (Código ' + respuesta.status + ')');
        }
        return respuesta.json();
    })
    .then(function (datos) {
        // Ocultamos el mensaje de carga al recibir los datos
        mensajeCarga.classList.add('oculto');

        // Mostramos el extra (conteo por región) y la lista de departamentos
        mostrarConteoPorRegion(datos);
        mostrarDepartamentos(datos);
    })
    .catch(function (error) {
        // Ocultamos el mensaje de carga y mostramos el error en el DOM
        mensajeCarga.classList.add('oculto');
        mensajeError.textContent = 'Error al cargar los departamentos: ' + error.message;
        mensajeError.classList.remove('oculto');
        console.error('Error en fetch de departamentos:', error);
    });
