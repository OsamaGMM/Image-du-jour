/**
 * Formate un objet date JS en un chaine ayant le format : AAAAMMJJ
 * @param {date} objDate :  date JavaScript
 * @returns {String} chaine de carateres representant cette date
 * 
 */
export function formaterDateNumerique(objDate){
    return objDate.getFullYear()
            + (objDate.getMonth() + 1).toString().padStart(2,'0')
            + (objDate.getDate()).toString().padStart(2,'0')
}