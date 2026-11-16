# Mini Portal de Colombia con API

## Descripción
Mini portal web informativo sobre Colombia que consume datos en tiempo real desde la API pública [API Colombia](https://api-colombia.com/) utilizando `fetch` y muestra la información dinámicamente en el DOM mediante JavaScript.

El proyecto desarrolla las siguientes dos opciones en páginas independientes conectadas por hipervínculos:
1. **Explorador de departamentos de Colombia (`index.html`)**: Consume `/api/v1/Department` y muestra el nombre, región, población, superficie y descripción de todos los departamentos de Colombia, incluyendo el conteo extra de departamentos por región.
2. **Colombia en datos (`colombia.html`)**: Consume `/api/v1/Country/Colombia` y muestra la bandera nacional (con respaldo automático de imagen), descripción general, capital, población, superficie, moneda, código y símbolo monetario, idiomas, zona horaria, código ISO, dominio de internet, prefijos y fronteras.

## Tecnologías usadas
- **HTML5**: Estructura semántica de las páginas (`index.html` y `colombia.html`).
- **CSS3**: Estilos sencillos y diseño en cuadrícula (`css/styles.css`).
- **JavaScript (ES6)**: Consumo de API con `fetch`, manejo de promesas (`.then()`), manejo de errores con `.catch()`, estados de carga y creación dinámica de nodos en el DOM (`script.js` y `colombia.js`).
- **API Pública**: [https://api-colombia.com/](https://api-colombia.com/)

## Instrucciones de uso
1. Clonar o descargar este repositorio en tu equipo local:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Abrir la carpeta del proyecto.
3. Abrir el archivo `index.html` directamente en cualquier navegador web moderno (o mediante la extensión *Live Server* en Visual Studio Code).
4. Utilizar la barra de navegación superior para cambiar entre **1. Explorador de Departamentos** y **3. Colombia en Datos** mediante los hipervínculos.

## Estructura del proyecto
```text
├── css/
│   └── styles.css       # Hoja de estilos compartida
├── index.html           # Página 1: Explorador de Departamentos de Colombia
├── script.js            # Lógica JS y consumo de /api/v1/Department
├── colombia.html        # Página 2: Colombia en Datos
├── colombia.js          # Lógica JS y consumo de /api/v1/Country/Colombia
└── README.md            # Documentación del proyecto
```

## Nombre del estudiante
- **Estudiante**: mcalderonserpa *(reemplazar con tu nombre y apellido completo si lo deseas antes de entregar)*
