import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { bd, collImages, collUtilisateurs } from "./init";

    // lire une images
    export async function lireUneImage(jour) {
        const idj = await getDoc(doc(bd, collImages, jour))
        //Ajouster le tableau comme voulu et la retourner
        //return idj;
    }

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