import React, { useContext } from "react";
import Vote from "./Vote";
import "./Commentaire.scss";
import { JourContext, UtilisateurContext } from "./Appli";
import { supprimerComm } from "../code/image-modele";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Commentaire({ id, idUtil, texte, nomUtil, votes }) {
  //Contexte pour l'util et le jour
  const utilisateur = useContext(UtilisateurContext);
  const jour = useContext(JourContext);

  //Pas sur si le await est n/cessaire?
  //Fonction pour enlever un commentaire
  async function supprimerCommentaire(jour, idComm) {
    await supprimerComm(jour, idComm);
  }

  return (
    <div className="Commentaire">
      <p>{nomUtil}</p>
      <p>{texte}</p>
      <Vote idComm={id} votes={votes} />
      {utilisateur ? (
        idUtil === utilisateur.uid ? (
          <button className="deleteComm" key={id} onClick={() => supprimerCommentaire(jour, id)}>
            <HighlightOffIcon color="error" fontSize="large"/>
          </button>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default Commentaire;
