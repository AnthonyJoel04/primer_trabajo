const UN_DIA_MS = 24 * 60 * 60 * 1000;

function sumarDias(fecha, dias) {
  return new Date(fecha.getTime() + dias * UN_DIA_MS);
}

function crearLibro(titulo, autor, genero, isbn) {
  return {
    id: Date.now(),
    titulo,
    autor,
    genero,
    isbn,
    disponible: true,
    prestadoA: null,
    fechaPrestamo: null,
    fechaDevolucion: null,
    fechaRegistro: new Date()
  };
}

function agregarLibro(biblioteca, titulo, autor, genero, isbn) {
  const libro = crearLibro(titulo, autor, genero, isbn);
  biblioteca.push(libro);
  return libro;
}

function eliminarLibro(biblioteca, idLibro) {
  const i = biblioteca.findIndex(l => l.id === idLibro);
  if (i === -1) return null;
  return biblioteca.splice(i, 1)[0];
}

function prestarLibro(biblioteca, prestamos, idLibro, nombrePersona, dias = 14) {
  const libro = biblioteca.find(l => l.id === idLibro);
  if (!libro) return { ok: false, mensaje: "No existe el libro." };
  if (!libro.disponible) return { ok: false, mensaje: "Ya está prestado." };

  const hoy = new Date();
  libro.disponible = false;
  libro.prestadoA = nombrePersona;
  libro.fechaPrestamo = hoy;
  libro.fechaDevolucion = sumarDias(hoy, dias);

  prestamos.set(idLibro, libro);

  return { ok: true, mensaje: "Préstamo registrado.", libro, fechaDevolucion: libro.fechaDevolucion };
}

function devolverLibro(biblioteca, prestamos, idLibro, tarifa = 0.5) {
  const libro = prestamos.get(idLibro);
  if (!libro) return { ok: false, mensaje: "Ese libro no estaba prestado.", multa: 0 };

  const multa = calcularMulta(libro.fechaDevolucion, tarifa);

  libro.disponible = true;
  libro.prestadoA = null;
  libro.fechaPrestamo = null;
  libro.fechaDevolucion = null;

  prestamos.delete(idLibro);

  return { ok: true, mensaje: "Libro devuelto.", multa };
}

function calcularMulta(fechaDevolucion, tarifa = 0.5) {
  if (!(fechaDevolucion instanceof Date)) return 0;
  const hoy = new Date();
  if (hoy <= fechaDevolucion) return 0;

  const msAtraso = hoy.getTime() - fechaDevolucion.getTime();
  const diasAtraso = Math.ceil(msAtraso / UN_DIA_MS);
  return diasAtraso * tarifa;
}

function buscarLibros(biblioteca, texto) {
  const t = String(texto ?? "").toLowerCase();
  return biblioteca.filter(l =>
    l.titulo.toLowerCase().includes(t) ||
    l.autor.toLowerCase().includes(t) ||
    l.genero.toLowerCase().includes(t)
  );
}

function librosPorGenero(biblioteca, genero) {
  const g = genero.toLowerCase();
  return biblioteca.filter(l => l.genero.toLowerCase() === g);
}

function librosVencidos(prestamos, tarifa = 0.5) {
  const hoy = new Date();
  const resultado = [];
  prestamos.forEach(l => {
    if (hoy > l.fechaDevolucion) {
      resultado.push({
        id: l.id,
        titulo: l.titulo,
        persona: l.prestadoA,
        fechaDevolucion: l.fechaDevolucion,
        multa: calcularMulta(l.fechaDevolucion, tarifa)
      });
    }
  });
  return resultado;
}

function reporteBiblioteca(biblioteca, prestamos) {
  const vencidos = librosVencidos(prestamos);
  return {
    total: biblioteca.length,
    prestados: prestamos.size,
    disponibles: biblioteca.filter(l => l.disponible).length,
    vencidos: vencidos.length,
    totalMultas: vencidos.reduce((s, v) => s + v.multa, 0)
  };
}

module.exports = {
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
};
