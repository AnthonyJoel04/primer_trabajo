# Programación y servicios web — Trabajo #1. Conceptos básicos
**Anthony Montañez 4to semestre Ingeniera de Software**

# Objetivo
Crear un **Sistema de Gestión de Biblioteca con funcionalidades de préstamos, devoluciones, búsqueda y reportes, integrando los conceptos vistos.**


El proyecto se realizo de la siguiente manera:

# 1) Primero se configuro el entorno de desarrollo

git config --global user.name "AnthonyJoel04"
git config --global user.email "aj.montanez04@ciaf.edu.co"

Aunque lo realice de manera diferente, cree un codespace para no tener que colocar código cada vez que quiera 
hacer un push, entonces solo hago commit mediante el control de código fuente.

# 2) Crear proyecto de npm

npm init -y
En package.json se utilizo el formato sencillo para poder usarlo de manera correcta:

{
  "nombre": "sistema-biblioteca",
  "version": "1.0.0",
  "descripción": "Sistema de biblioteca en JavaScript con funciones en español.",
  "main": "archivo.js",
  "scripts": {
    "start": "node archivo.js"
  },
  "autor": "Jhon",
  "licencia": "ISC",
  "dependencias": {
    "chalk": "^5.6.0"
  }
}

- Estructura que se le dio al proyecto:

/primer_trabajo
  ├─ package.json
  ├─ README.md
  ├─ src/
  │   └─ biblioteca.js
  └─ archivo.js

Para ejecutar utilice:
**npm start**

# 3) Desarrolle las funciones del sistema de biblioteca
Implemente las 10 funciones descritas pero con nombres en español para facilitar la lectura.

# 4) Configurar control de versiones

git init
echo "node_modules/" > .gitignore
git add .
git commit -m "primer_trabajo"

# 5) Subir a GitHub

git remote add origin https://github.com/AnthonyJoel04/primer_trabajo.git
git branch -M main
git push -u origin main

O codespace como en mi caso para que sea mas sencillo.

# 6) Documentar proyecto

Incluí en este README: cómo se hizo, dificultades encontradas, instalación y uso de cada función.

Una de las dificultades encontradas es que al momento de conectar es un poco confuso, luego al configurar
el codespace se vuelve mucho mas sencillo de manera que con código para cada commit

Instalación, se realizo instalación de GIT y Node.js para poder ejecutar el código.

1) Crear libro (titulo, autor, genero, isbn)

Propósito: crear un objeto libro.
Parámetros: strings titulo, autor, genero, isbn.
Retorna: objeto con:
id (timestamp numérico único),
titulo, autor, genero, isbn,
disponible: true,
prestadoA: null,
fechaPrestamo: null,
fechaDevolucion: null,
fechaRegistro: Date.

- 2) Agregar libro (biblioteca, titulo, autor, genero, isbn)
Propósito: agregar un libro a biblioteca.
Parámetros: array biblioteca, strings del libro.
Acción: llama a crearLibro y hace push.
Retorna: el libro creado.

- 3) Eliminar libro (biblioteca, idLibro)
Propósito: eliminar por ID.
Parámetros: array biblioteca, número idLibro.
Acción: findIndex + splice.
Retorna: libro eliminado o null si no existe.

- 4) Prestar libro (biblioteca, prestamos, idLibro, nombrePersona, dias = 14)
Propósito: registrar un préstamo.
Parámetros: array biblioteca, prestamos (Map), idLibro (número), nombrePersona (string), dias (número; por defecto 14).
Acciones: verifica existencia/disponibilidad; setea disponible=false, prestadoA, fechaPrestamo, fechaDevolucion; añade al Map.
Retorna: { ok:boolean, mensaje:string, libro:object, fechaDevolucion:Date }.

- 5) Devolver libro (biblioteca, prestamos, idLibro, tarifa = 0.5)
Propósito: devolver un libro prestado.
Acciones: valida que está prestado; calcula multa; restaura campos; quita del Map.
Retorna: { ok:boolean, mensaje:string, multa:number }.

- 6) Calcular multa (fechaDevolucion, tarifa = 0.5)
Propósito: calcular multa por atraso.
Acción: si hoy > fechaDevolucion, multa = ceil(días de atraso) * tarifa; si no, 0.
Retorna: número.

- 7) Buscar libros (biblioteca, texto)
Propósito: buscar por título, autor o género (case-insensitive).
Acción: filtra biblioteca comparando cadenas normalizadas (puedes ignorar tildes).
Retorna: array de coincidencias.

- 8) Libros por genero (biblioteca, genero)
Propósito: obtener libros de un género exacto (case-insensitive).
Acción: filter por genero.
Retorna: array.

- 9) Libros vencidos (prestamos, tarifa)
Propósito: listar libros cuyo fechaDevolucion ya pasó.
Acción: recorre el Map y arma objetos con id, titulo, persona, fechaDevolucion y multa (usando calcularMulta).
Retorna: array de vencidos.

- 10) Reporte de biblioteca (biblioteca, prestamos)
Propósito: generar estadísticas de la biblioteca.
Retorna: objeto con:
total (libros totales),
prestados (cantidad en prestamos),
disponibles (en biblioteca con disponible=true),
vencidos (cantidad de librosVencidos),
totalMultas (suma de multas de vencidos).