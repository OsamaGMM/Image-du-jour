import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  onSnapshot,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { bd, collComs, collImages, collUtilisateurs } from "./init";

// lire une images
export async function lireUneImage(jour) {
  const idjFS = await getDoc(doc(bd, collImages, jour));
  const date = new Date().toLocaleDateString("fr-CA", { dateStyle: "long" }); // Get the current date and format it as a string
  return [{ ...idjFS.data(), date: date }];
}

//Commentaire

export async function lireLesCommentaires(jour) {
  const commsFS = await getDocs(
    query(
      collection(bd, collImages, jour, collComs),
      orderBy("timestamp", "desc")
    )
  );
  return commsFS.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //console.log(commsFS.docs.map(doc => ({id: doc.id, ...doc.data()})));
}
// lireLesCommentaires('20230426')

/**
 * Observer les commentaires en temps reel
 */

export function observer(jour, mutateurCommentaires) {
  return onSnapshot(
    query(
      collection(bd, collImages, jour, collComs),
      orderBy("timestamp", "desc")
    ),
    (resultat) => {
      const commsFS = resultat.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      mutateurCommentaires(commsFS);
    }
  );
}

export async function creerCommentaire(jour, infoComm) {
  // Utiliser updateDoc
  const refComm = doc(collection(bd, collImages, jour, collComs));
  console.log(jour, infoComm);
  await setDoc(refComm, infoComm);
  //return refComm.id
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

//modifier une image (INSPIRATION)
export async function modifierAimeIMG(jour, idUtil, mutateurAimes) {
    // Utiliser updateDoc
    const refImage = doc(bd, collImages, jour);
    const docSnapshot = await getDoc(refImage);

      const data = docSnapshot.data();
      const arrayAime = data.aime || [];
      
      await updateDoc(refImage, {
        aime: arrayAime.includes(idUtil)
          ? arrayRemove(idUtil)
          : arrayUnion(idUtil),
      });

      onSnapshot(refImage, (prochaine) => {
        const updatedData = prochaine.data();
        const updatedArrayAime = updatedData.aime;
        // Perform any necessary operations with the updated aime array
        // For example, update the state or trigger a re-render
        mutateurAimes(updatedArrayAime)
      });
  }

  export async function modifierVote(jour, idComm, idUtil, vote) {
    const refVote = doc(bd, collImages, jour, collComs, idComm)
    const voteSnapshot = await getDoc(refVote);
    const objVote = voteSnapshot.data().votes || {};
    //console.log(objVote);
    if (vote > 0) {
        //console.log('UPvote ajouter');
        objVote[idUtil] = 1; // Add or update the desired key-value pair
      } else {
        //console.log('DOWNvote ajouter');
        objVote[idUtil] = -1; // Add or update the desired key-value pair
      }

    await updateDoc(refVote, {
        votes: objVote, // Provide the updated map object
      });
  }


// supprimer un commentaire (INSPIRATION)
// export async function supprimer(idUtil, idDossier) {
//     const refDossier = doc(bd, collUtilisateurs, idUtil, collDossiers, idDossier);
//     await deleteDoc(refDossier);
// }
