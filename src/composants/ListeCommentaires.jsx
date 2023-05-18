import { useContext, useEffect, useRef, useState } from "react";
import "./ListeCommentaires.scss";
import Commentaire from "./Commentaire";
import {
  creerCommentaire,
  lireLesCommentaires,
  observer,
} from "../code/image-modele";
import { UtilisateurContext, JourContext } from "./Appli";

function ListeCommentaires() {
  const utilisateur = useContext(UtilisateurContext);
  const jour = useContext(JourContext);

  const [lesCommentaires, setLesCommentaires] = useState([]);
  const [commentText, setCommentText] = useState("");

  //Mettre le jour en param
  // Voir les changement des commentaires en temps reel
  useEffect(() => {
    async function chercherLesCommentaires() {
      observer(jour, setLesCommentaires)
    }
    chercherLesCommentaires();
  }, [jour]);

  async function ajouterUnCommentaire(jour,idUtil,nomUtil,texte,timestamp,votes) {
    const commData = { idUtil, nomUtil, texte, timestamp, votes };
    const idComm = await creerCommentaire(jour, commData);
    setLesCommentaires([...lesCommentaires, { id: idComm, ...commData }]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    ajouterUnCommentaire(jour,utilisateur.uid,utilisateur.displayName,commentText,new Date().getTime().toString(),{});
    setCommentText("");
  }

  return (
    <div className="ListeCommentaires">
      {
        //Son propre component eventuellement
        utilisateur ? (
          <div className="ajouterComm">
            <p>{utilisateur.displayName}</p>

            <form id="ajouterComms" onSubmit={handleSubmit}>
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </form>
          </div>
        ) : (
          <div>Connecter vous pour ecrire un commentaire</div>
        )
      }
      <div className="lesCommentaire">
        {lesCommentaires.length !== 0 ? (
          lesCommentaires.map((comm) => (
            <Commentaire
              key={comm.id}
              id={comm.id}
              idUtil={comm.idUtil}
              texte={comm.texte}
              nomUtil={comm.nomUtil}
              votes={comm.votes}
            />
          ))
        )
         :
        (
          <div>L'image n'a pas encore de commentaire</div>
        )
        }
      </div>
    </div>
  );
}

export default ListeCommentaires;
