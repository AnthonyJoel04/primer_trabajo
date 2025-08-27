const {
  crearLibro,
  agregarLibro,
  eliminarLibro,
  prestarLibro,
  devolverLibro,
  calcularMulta,
  buscarLibros,
  librosPorGenero,
  librosVencidos,
  reporteBiblioteca
} = require("./src/biblioteca");

const fmt = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Bogota"
});
const DIA_MS = 24 * 60 * 60 * 1000;

function ffecha(d) { return d instanceof Date ? fmt.format(d) : d; }
function linea(t) { console.log("\n" + t); }

const biblioteca = [];
const prestamos = new Map();

const demo = crearLibro("Bestia", "Sam León", "Fantasia", "000");
linea("1) Crear libro: " +
  `Título: ${demo.titulo} | Autor: ${demo.autor} | Género: ${demo.genero} | ISBN: ${demo.isbn} | Registro: ${ffecha(demo.fechaRegistro)}`);

const l1 = agregarLibro(biblioteca, "Bestia", "Sam León", "Fantasia", "111");
const l2 = agregarLibro(biblioteca, "Satanas", "Mario Mendoza", "Thriller", "222");
const l3 = agregarLibro(biblioteca, "Un día para vivir", "Autor Anónimo", "Drama", "333");
const l4 = agregarLibro(biblioteca, "Pasos cortos", "Autor Anónimo", "Desarrollo personal", "444");
const l5 = agregarLibro(biblioteca, "Mi angel guardian", "Autor Anónimo", "Romance", "555");
const l6 = agregarLibro(biblioteca, "La tregua", "Mario Benedetti", "Romance", "666");
const l7 = agregarLibro(biblioteca, "Pedro Páramo", "Juan Rulfo", "Realismo mágico", "777");
linea("2) Catálogo: " + biblioteca.map(l => l.titulo).join(" | "));

const quitado = eliminarLibro(biblioteca, l6.id);
linea("3) Eliminado: " + (quitado ? quitado.titulo : "No se encontró"));
linea("3) Catálogo tras eliminar: " + biblioteca.map(l => l.titulo).join(" | "));

const prestado = prestarLibro(biblioteca, prestamos, l1.id, "Anthony", 7);
linea("4) Préstamo: " +
  (prestado.ok
    ? `Título: ${prestado.libro.titulo} | A: ${prestado.libro.prestadoA} | Devuelve: ${ffecha(prestado.libro.fechaDevolucion)}`
    : `Error: ${prestado.mensaje}`));

const devolucion = devolverLibro(biblioteca, prestamos, l1.id);
linea("5) Devolución: " +
  (devolucion.ok
    ? `Libro devuelto | Multa: ${devolucion.multa}`
    : `Error: ${devolucion.mensaje}`));

const fechaVencidaDemo = new Date(Date.now() - 3 * DIA_MS);
const multaDemo = calcularMulta(fechaVencidaDemo);
linea("6) Multa simulada (3 días × 0.5): " + multaDemo);

const encontrados = buscarLibros(biblioteca, "Fantasia").map(l => l.titulo).join(" | ");
linea("7) Buscar 'Fantasia': " + (encontrados || "Sin resultados"));

const realismoMagico = librosPorGenero(biblioteca, "Realismo mágico").map(l => l.titulo).join(" | ");
linea("8) Género 'Realismo mágico': " + (realismoMagico || "Sin resultados"));

prestarLibro(biblioteca, prestamos, l7.id, "Ana", 7);
const pl7 = prestamos.get(l7.id);
pl7.fechaDevolucion = new Date(Date.now() - 2 * DIA_MS);
const vencidos = librosVencidos(prestamos);
if (vencidos.length === 0) {
  linea("9) Vencidos: Ninguno");
} else {
  const filas = vencidos.map(v =>
    `Título: ${v.titulo} | Persona: ${v.persona} | Devolución: ${ffecha(v.fechaDevolucion)} | Multa: ${v.multa}`
  ).join(" || ");
  linea("9) Vencidos: " + filas);
}

const rep = reporteBiblioteca(biblioteca, prestamos);
linea("10) Reporte → " +
  `Total: ${rep.total} | Prestados: ${rep.prestados} | Disponibles: ${rep.disponibles} | Vencidos: ${rep.vencidos} | Total Multas: ${rep.totalMultas}`);
