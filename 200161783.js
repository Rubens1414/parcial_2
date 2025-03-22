const datos = require("./datos.json");

function Promedio_e(estudiante) {
  return estudiante.info_matricula.map(curso => curso.notas.reduce((total, nota) => total + nota.nota * nota.peso, 0)).reduce((suma, nota) => suma + nota, 0) / estudiante.info_matricula.length;
}

function obtenerSemestre(estudiante) {
  return estudiante.info_matricula.map(curso => curso.semestre).sort((a, b) => b - a)[0];
}

function transformarEstudiante(estudiante) {
  return {
    nombre: `${estudiante.info_personal.nombre} ${estudiante.info_personal.apellido}`,
    promedio: Promedio_e(estudiante),
    semestre: obtenerSemestre(estudiante),
  };
}

function estudiantes_altura(estudiante){
  return {
    id: estudiante.info_personal._id,
    nombre: `${estudiante.info_personal.nombre} ${estudiante.info_personal.apellido}`,
    semestre: obtenerSemestre(estudiante),
    altura: estudiante.info_personal.altura,
    extracurricular: estudiante.info_extra_curriculares.filter(ec => ec.nombre=="Baloncesto"  ).map(ec => ec.nombre),
  };
}



function formatearEstudiante(estudiante) {
  return {
    gender: estudiante.info_personal.gender,
    titulo: estudiante.info_personal.gender === "M" ? "Sr." : "Sra.",
    nombreCompleto: `${estudiante.info_personal.nombre} ${estudiante.info_personal.apellido}`,
    primerNombre: estudiante.info_personal.nombre,
    primerApellido: estudiante.info_personal.apellido,
    altura: estudiante.info_personal.altura,
    edad: 2024 - parseInt(estudiante.info_personal.nacimiento.substring(0, 4)),
    nacimiento: estudiante.info_personal.nacimiento,
    correo: estudiante.info_personal.correo,
    usuario: estudiante.info_personal.correo.split("@")[0],
  };
}

//PUNTO 1
function puntoUno(estudiantes,extracurricular) {
  return estudiantes.filter(e => e.info_extra_curriculares.some(ec => ec.nombre === extracurricular)).map(e => e.info_personal.correo);
}
//PUNTO 2
function puntoDos(estudiantes,semestre) {
  return estudiantes.map(transformarEstudiante).sort((a, b) => b.promedio - a.promedio).reduce((acc, estudiante) => {
      if (!acc.some(e => e.semestre === semestre)) acc.push(estudiante);
      return acc;}, []).map(e => e.nombre+" Promedio: "+e.promedio+" Semestre:"+e.semestre);
}
//PUNTO 3
function puntoTres(estudiantes) {
  return estudiantes.filter(e => obtenerSemestre(e) === 1).map(formatearEstudiante);
}



function puntoCuatro(estudiantes) {
  
  return estudiantes.filter(e=> obtenerSemestre(e) === e.info_extra_curriculares.filter(ec => ec.nombre === "Baloncesto").map(ec => ec.semestre)[0]).map(estudiantes_altura).sort((a, b) => b.altura - a.altura).reduce((acc, estudiante) => {
    if (!acc.some(e => e.semestre === estudiante.semestre)) acc.push(estudiante);
      return acc;}, []).
    map(e =>"Nombre completo:"+ e.nombre+" "+"Semestre:"+e.semestre+" "+"Altura:"+e.altura+" "+e.extracurricular)[0];
  
}

console.log(puntoUno(datos,"INNOVA"));
console.log(puntoDos(datos,1));
console.log(puntoTres(datos));
console.log(puntoCuatro(datos));
