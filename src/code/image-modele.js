import {
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  onSnapshot,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { bd, collComs, collImages } from "./init";

/**
 * Lire l'image du jour
 * @param {String} jour  Date en string format -> AAAAMMJJ
 * @returns L'image du jour et toute sont information (aimes, description, url)
 */
export async function lireUneImage(jour) {
  const idjFS = await getDoc(doc(bd, collImages, jour));
  return [{ ...idjFS.data()}];
}



/**
 * Observer les commentaires en temps reel
 * @param {String} jour  Date en string format -> AAAAMMJJ
 * @param {Function} mutateurCommentaires  Fonction pour gérer l'état (setLesCommentaire)
 * @returns Une array des commentaires de l'image
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

/**
 * Créer un commentaire
 * @param {String} jour  Date en string format -> AAAAMMJJ
 * @param {object} infoComm  Objet avec toute les infos du commentaire
 * { idUtil, nomUtil, texte, timestamp, votes }
 * @returns l'id du nouveau commentaire
 */
export async function creerCommentaire(jour, infoComm) {
  const refComm = doc(collection(bd, collImages, jour, collComs));
  console.log(jour, infoComm);
  await setDoc(refComm, infoComm);
  return refComm.id
}

/**
 * Supprimer un commentaire
 * @param {String} jour Date en string format -> AAAAMMJJ
 * @param {id}  idCommentaire id du commentaire cliqué
 */
export async function supprimerComm(jour, idCommentaire) {
    const refComm = doc(bd, collImages, jour, collComs, idCommentaire);
    await deleteDoc(refComm);
}

/**
 * Modifie le nombre de j'aime d'une image
 * @param {String} jour Date en string format -> AAAAMMJJ
 * @param {id} idUtil L'id de l'utilisateur qui a cliqué
 * @param {Function}  mutateurAimes Fonction pour gérer l'état (setLesCommentaire)
 */
export async function modifierAimeIMG(jour, idUtil, mutateurAimes) {
    const refImage = doc(bd, collImages, jour);
    const docSnapshot = await getDoc(refImage);

      const data = docSnapshot.data();
      const arrayAime = data.aime || [];
      // On enlève ou rajoute l'id de l'utilisateur
      await updateDoc(refImage, {
        aime: arrayAime.includes(idUtil)
          ? arrayRemove(idUtil)
          : arrayUnion(idUtil),
      });
      //On observe le nombre de "like" en LIVE!
      onSnapshot(refImage, (prochaine) => {
        const updatedData = prochaine.data();
        const updatedArrayAime = updatedData.aime;
        mutateurAimes(updatedArrayAime)
      });
  }

  /**
 * Modifie les votes d'un commentaire (upVote/downVote)
 * @param {String} jour Date en string format -> AAAAMMJJ
 * @param {id} idComm L'id du commentaire
 * @param {id} idUtil L'id de l'utilisateur qui vote
 * @param {number} vote La valeur du vote 1 ou -1
 */
  export async function modifierVote(jour, idComm, idUtil, vote) {
    const refVote = doc(bd, collImages, jour, collComs, idComm)
    const voteS = await getDoc(refVote);
    const objVote = voteS.data().votes || {};
    // --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
    // --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
    //Si le idUtil est dedans et que valeur du vote recu est la meme on enleve le vote
    if (idUtil in objVote && objVote[idUtil] === vote) {
      delete objVote[idUtil];
    }else {
      const nouvVote = vote > 0 ? 1 : -1;
      objVote[idUtil] = nouvVote;
    }

    await updateDoc(refVote, {votes: objVote});
  }