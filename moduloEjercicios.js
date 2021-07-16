import basededatos from './basededatos.js';


/**
* Devuelve el promedio de anios de estreno de todas las peliculas de la base de datos.
*/
const peliculas = basededatos.peliculas //pregunntar
const calificaciones = basededatos.calificaciones
const directores = basededatos.directores
export const promedioAnioEstreno = () => {
    // Ejemplo de como accedo a datos dentro de la base de datos
    // console.log(basededatos.peliculas);
    let total = 0
    peliculas.forEach((peli) => {
        total = total + peli.anio
    })
    const prom = total/(peliculas.length)
    return prom;
};


/**
* Devuelve la lista de peliculas con promedio de critica mayor al numero que llega
* por parametro.
* @param {number} promedio
  */
export const pelicuasConCriticaPromedioMayorA = (promedio) => {
    let idPeliculas = []
    calificaciones.forEach((calif) => {
        if(calif.puntuacion>promedio)
        idPeliculas.push(calif.pelicula)
    })
    return peliculas.filter((peli) => idPeliculas.includes(peli.id))
};

/**
* Devuelve la lista de peliculas de un director
* @param {string} nombreDirector
*/
export const peliculasDeUnDirector = (nombreDirector) => {
    const director = directores.filter((direc) => direc.nombre === nombreDirector)[0]
    const id = director.id
    return peliculas.filter((peli) => (
        peli.directores.includes(id)
    ))
};

/**
* Devuelve el promdedio de critica segun el id de la pelicula.
* @param {number} peliculaId
*/
export const promedioDeCriticaBypeliculaId = (peliculaId) => {
    let total = 0
    const calificacionesPelicula = calificaciones.filter((calif)=> calif.pelicula === peliculaId)
    calificacionesPelicula.forEach((calif)=> {
        total = total + calif.puntuacion
    })
    return total/calificacionesPelicula.length
};

/**
 * Obtiene la lista de peliculas con alguna critica con
 * puntuacion excelente (critica >= 9).
 * En caso de no existir el criticas que cumplan, devolver un array vacio [].
 * Ejemplo del formato del resultado: 
 *  [
        {
            id: 1,
            nombre: 'Back to the Future',
            anio: 1985,
            direccionSetFilmacion: {
                calle: 'Av. Siempre viva',
                numero: 2043,
                pais: 'Colombia',
            },
            directores: [1],
            generos: [1, 2, 6]
        },
        {
            id: 2,
            nombre: 'Matrix',
            anio: 1999,
            direccionSetFilmacion: {
                calle: 'Av. Roca',
                numero: 3023,
                pais: 'Argentina'
            },
            directores: [2, 3],
            generos: [1, 2]
        },
    ],
 */
export const obtenerPeliculasConPuntuacionExcelente = () => {
    // Ejemplo de como accedo a datos dentro de la base de datos
    // console.log(basededatos.peliculas);
    let idPeliculas = []
    calificaciones.forEach((calif) => {
        if(calif.puntuacion>=9)
        idPeliculas.push(calif.pelicula)
    })
    const peliculas = basededatos.peliculas
    return peliculas.filter((peli) => idPeliculas.includes(peli.id))
    return [];
};

/**
 * Devuelve informacion ampliada sobre una pelicula.
 * Si no existe la pelicula con dicho nombre, devolvemos undefined.
 * Ademas de devolver el objeto pelicula,
 * agregar la lista de criticas recibidas, junto con los datos del critico y su pais.
 * Tambien agrega informacion de los directores y generos a los que pertenece.
 * Ejemplo de formato del resultado para 'Indiana Jones y los cazadores del arca perdida':
 * {
            id: 3,
            nombre: 'Indiana Jones y los cazadores del arca perdida',
            anio: 2012,
            direccionSetFilmacion: {
                calle: 'Av. Roca',
                numero: 3023,
                pais: 'Camboya'
            },
            directores: [
                { id: 5, nombre: 'Steven Spielberg' },
                { id: 6, nombre: 'George Lucas' },
            ],
            generos: [
                { id: 2, nombre: 'Accion' },
                { id: 6, nombre: 'Aventura' },
            ],
            criticas: [
                { critico: 
                    { 
                        id: 3, 
                        nombre: 'Suzana Mendez',
                        edad: 33,
                        pais: 'Argentina'
                    }, 
                    puntuacion: 5 
                },
                { critico: 
                    { 
                        id: 2, 
                        nombre: 'Alina Robles',
                        edad: 21,
                        pais: 'Argentina'
                    }, 
                    puntuacion: 7
                },
            ]
        },
 * @param {string} nombrePelicula
 */

        const getCriticas = (pelicula) =>{
            const criticas = calificaciones.filter((calif) => calif.pelicula == pelicula.id)
            let criticasCompletas = []
            const criticos = basededatos.criticos
            criticas.forEach((c) => {
                const indexCritico = criticos.findIndex((critico)=> critico.id == c.critico )
                console.log('INDEX', indexCritico)
                    console.log('HOLA')
                const critico = criticos[indexCritico]
                const criticaCompleta = {
                    critico, 
                    puntuacion: c.puntuacion,
                };
                criticasCompletas.push(criticaCompleta)
        })
            return criticasCompletas
        }
export const expandirInformacionPelicula = (nombrePelicula) => {
    const index = peliculas.findIndex((peli)=> peli.nombre === nombrePelicula)
    if(index == -1){
        return
    }
    const pelicula=peliculas[index]
    const directoresCompletos = getDirectores(pelicula)
    const generosCompletos = getGeneros(pelicula)
    const criticasCompletas = getCriticas(pelicula)
    
    return {
        ...pelicula, 
        directores: directoresCompletos, 
        generos: generosCompletos,
        criticas:criticasCompletas,
    };
};

const getDirectores = (pelicula) => {
    const directoresId = pelicula.directores
    return directores.filter((direc) => directoresId.includes(direc.id))
    
}

const getGeneros = (pelicula) => {
    const generosId = pelicula.generos
    const generos = basededatos.generos
    return generos.filter((gen) => generosId.includes(gen.id))
}