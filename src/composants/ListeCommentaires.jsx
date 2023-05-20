import { useContext, useEffect, useRef, useState } from "react";
import "./ListeCommentaires.scss";
import Commentaire from "./Commentaire";
import { creerCommentaire, observer } from "../code/image-modele";
import { UtilisateurContext, JourContext } from "./Appli";
import FormComm from "../UI-composants/Form";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';

import CommentsDisabledOutlinedIcon from '@mui/icons-material/CommentsDisabledOutlined';


function ListeCommentaires({ setAfficherComm, afficherComm }) {
  const utilisateur = useContext(UtilisateurContext);
  const jour = useContext(JourContext);

  const [lesCommentaires, setLesCommentaires] = useState([]);
  const [commText, setCommText] = useState("");

  //Mettre le jour en param
  // Voir les changement des commentaires en temps reel
  useEffect(() => {
    async function chercherLesCommentaires() {
      observer(jour, setLesCommentaires);
    }
    chercherLesCommentaires();
  }, [jour]);

  async function ajouterUnCommentaire(
    jour,
    idUtil,
    nomUtil,
    texte,
    timestamp,
    votes
  ) {
    const commData = { idUtil, nomUtil, texte, timestamp, votes };
    const idComm = await creerCommentaire(jour, commData);
    setLesCommentaires([...lesCommentaires, { id: idComm, ...commData }]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    ajouterUnCommentaire(
      jour,
      utilisateur.uid,
      utilisateur.displayName,
      commText,
      new Date().getTime().toString(),
      {}
    );
    setCommText("");
  }

  //Use effect pour fermer quand tu click en dehors du liste commentaire
  const listeCommRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        listeCommRef.current &&
        !listeCommRef.current.contains(event.target)
      ) {
        setAfficherComm(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setAfficherComm]);

  return (
    <div className={"ListeCommentaires"} ref={listeCommRef}>
      {
        //Son propre component eventuellement
        utilisateur ? (
          <div className="ajouterComm">
            <IconButton
            className="fermerCommentaire"
            variant="outlined"
            size="small"
             onClick={() => setAfficherComm(false)}>
              <CommentsDisabledOutlinedIcon color="inherit"/>
            </IconButton>

            <FormComm
              handleSubmit={handleSubmit}
              commText={commText}
              setCommText={setCommText}
            ></FormComm>
          </div>
        ) : (
          //A STYLERR
          <div>Connecter vous pour ecrire un commentaire</div>
        )
      }
      <div className="lesCommentaires">
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
        ) : (
          <div>L'image n'a pas encore de commentaire</div>
        )}
      </div>
    </div>
  );
}

export default ListeCommentaires;
