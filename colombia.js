// URL del endpoint de Colombia en datos de la API de Colombia
const URL_COLOMBIA = 'https://api-colombia.com/api/v1/Country/Colombia';

// Imagen de respaldo válida en internet en caso de que la imagen de la API falle
const BANDERA_RESPALDO = 'https://flagcdn.com/w640/co.png';

// Referencias a los elementos del DOM
const mensajeCarga = document.getElementById('mensaje-carga');
const mensajeError = document.getElementById('mensaje-error');
const cabeceraPais = document.getElementById('cabecera-pais');
const contenedorDatos = document.getElementById('contenedor-datos-colombia');

// Función para mostrar la cabecera con nombre, bandera y descripción
function mostrarCabeceraPais(datos) {
    cabeceraPais.innerHTML = '';

    const titulo = document.createElement('h3');
    titulo.textContent = datos.name || 'Colombia';

    const imagenBandera = document.createElement('img');
    imagenBandera.className = 'bandera-pais';
    imagenBandera.alt = 'Bandera de ' + (datos.name || 'Colombia');

    // Si existe bandera en la API la usamos, de lo contrario usamos la imagen de respaldo
    if (datos.flags && datos.flags.length > 0) {
        imagenBandera.src = datos.flags[0];
    } else {
        imagenBandera.src = BANDERA_RESPALDO;
    }

    // Reemplazo automático si la URL de la imagen de la API no carga
    imagenBandera.onerror = function () {
        imagenBandera.src = BANDERA_RESPALDO;
    };

    const descripcion = document.createElement('p');
    descripcion.className = 'descripcion';
    descripcion.textContent = datos.description || 'Sin descripción disponible.';

    cabeceraPais.appendChild(titulo);
    cabeceraPais.appendChild(imagenBandera);
    cabeceraPais.appendChild(descripcion);
    cabeceraPais.classList.remove('oculto');
}

// Función para construir dinámicamente las tarjetas de datos de Colombia en el DOM
function mostrarDatosColombia(datos) {
    contenedorDatos.innerHTML = '';

    const listaDatos = [
        {
            titulo: 'Capital',
            valor: datos.stateCapital || 'Bogotá'
        },
        {
            titulo: 'Población',
            valor: datos.population
                ? datos.population.toLocaleString('es-CO') + ' habitantes'
                : 'No disponible'
        },
        {
            titulo: 'Superficie',
            valor: datos.surface
                ? datos.surface.toLocaleString('es-CO') + ' km²'
                : 'No disponible'
        },
        {
            titulo: 'Moneda',
            valor: datos.currency || 'Peso colombiano'
        },
        {
            titulo: 'Código de Moneda',
            valor: datos.currencyCode || 'COP'
        },
        {
            titulo: 'Símbolo de Moneda',
            valor: datos.currencySymbol || '$'
        },
        {
            titulo: 'Idiomas',
            valor: Array.isArray(datos.languages) ? datos.languages.join(', ') : 'Español'
        },
        {
            titulo: 'Zona Horaria',
            valor: datos.timeZone || 'UTC-5'
        },
        {
            titulo: 'Código ISO',
            valor: datos.isoCode || 'COL'
        },
        {
            titulo: 'Dominio de Internet',
            valor: datos.internetDomain || '.co'
        },
        {
            titulo: 'Prefijo Telefónico',
            valor: datos.phonePrefix || '+57'
        },
        {
            titulo: 'Prefijo de Radio',
            valor: datos.radioPrefix || 'HJ'
        },
        {
            titulo: 'Prefijo Aeronáutico',
            valor: datos.aircraftPrefix || 'HK'
        },
        {
            titulo: 'Región Continental',
            valor: datos.region || 'América'
        },
        {
            titulo: 'Subregión',
            valor: datos.subRegion || 'América del Sur'
        },
        {
            titulo: 'Fronteras Terrestres',
            valor: Array.isArray(datos.borders) ? datos.borders.join(', ') : 'No disponible'
        }
    ];

    listaDatos.forEach(function (item) {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'tarjeta';

        const etiqueta = document.createElement('h3');
        etiqueta.textContent = item.titulo;

        const valor = document.createElement('p');
        valor.textContent = item.valor;

        tarjeta.appendChild(etiqueta);
        tarjeta.appendChild(valor);
        contenedorDatos.appendChild(tarjeta);
    });
}

// Consumo de la API con fetch y manejo de errores con catch
fetch(URL_COLOMBIA)
    .then(function (respuesta) {
        if (!respuesta.ok) {
            throw new Error('No se pudo obtener la información de Colombia (Código ' + respuesta.status + ')');
        }
        return respuesta.json();
    })
    .then(function (datos) {
        // Ocultamos el mensaje de carga al recibir los datos
        mensajeCarga.classList.add('oculto');

        // Construimos la cabecera y las tarjetas de datos en el DOM
        mostrarCabeceraPais(datos);
        mostrarDatosColombia(datos);
    })
    .catch(function (error) {
        // Ocultamos el mensaje de carga y mostramos el error en el DOM
        mensajeCarga.classList.add('oculto');
        mensajeError.textContent = 'Error al cargar los datos de Colombia: ' + error.message;
        mensajeError.classList.remove('oculto');
        console.error('Error en fetch de Colombia:', error);
    });
