import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { bd, collComs, collImages, collUtilisateurs } from "./init";

    // lire une images
    export async function lireUneImage(jour) {
        const idjFS = await getDoc(doc(bd, collImages, jour))
        const date = new Date().toLocaleDateString('fr-CA', { dateStyle: 'long' }) // Get the current date and format it as a string
        return [{...idjFS.data(), date: date}]
    }

    //Commentaire
    
    export async function lireLesCommentaires(idImage) {
        const commsFS = await getDocs(collection(bd, collImages, idImage, collComs))
        return commsFS.docs.map(doc => ({id: doc.id, ...doc.data()}))
        //console.log(commsFS.docs.map(doc => ({id: doc.id, ...doc.data()})));
    }
    // lireLesCommentaires('20230426')

    //INSPIRATION
    // const dossiersFS = await getDocs(
    //     query(
    //         collection(bd, collUtilisateurs, idUtil, collDossiers),
    //         orderBy('dateModif', 'desc'),
    //         orderBy('titre', 'asc')    
    //     )
    // );
    // return dossiersFS.docs;


// modifier une image (INSPIRATION)
// export async function modifier(idUtil, idDossier, infoDossier) {
//     // Utiliser updateDoc
//     const refDossier = doc(bd, collUtilisateurs, idUtil, collDossiers, idDossier);
//     await updateDoc(refDossier, infoDossier);
// }

// supprimer un commentaire (INSPIRATION)
// export async function supprimer(idUtil, idDossier) {
//     const refDossier = doc(bd, collUtilisateurs, idUtil, collDossiers, idDossier);
//     await deleteDoc(refDossier);
// }