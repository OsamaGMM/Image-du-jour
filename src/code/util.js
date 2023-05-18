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
/**
 * Formate un string en date JS
 * @param {String} objDate : Date en string format : AAAAMMJJ
 * @returns {Date} Un objet date JS
 * 
 */

export function formaterDateString(dateString) {
    const annee = dateString.slice(0, 4);
    const mois = dateString.slice(4, 6) - 1;
    const jour = dateString.slice(6, 8);
    return new Date(annee, mois, jour);
  }