import { useContext, useEffect, useRef, useState } from "react";
import "./ListeCommentaires.scss";
import Commentaire from "./Commentaire";
import { creerCommentaire, observer } from "../code/image-modele";
import { UtilisateurContext, JourContext } from "./Appli";
import FormComm from "../UI-composants/Form";
import IconButton from "@mui/material/IconButton";

import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CommentsDisabledOutlinedIcon from "@mui/icons-material/CommentsDisabledOutlined";


function ListeCommentaires({ setAfficherComm }) {
  const utilisateur = useContext(UtilisateurContext);
  const jour = useContext(JourContext);
  // État pour les commentaires et le texte de l'utilisateur
  const [lesCommentaires, setLesCommentaires] = useState([]);
  const [commText, setCommText] = useState("");

  // Voir les changements des commentaires en temps réel et les chercher
  useEffect(() => {
    async function chercherLesCommentaires() {
      observer(jour, setLesCommentaires);
    }
    chercherLesCommentaires();
  }, [jour]);

  // Fonction pour ajouter un commentaire
  async function ajouterUnCommentaire(jour,idUtil,nomUtil,texte,timestamp,votes) {
    const commData = { idUtil, nomUtil, texte, timestamp, votes };
    const idComm = await creerCommentaire(jour, commData);
    setLesCommentaires([...lesCommentaires, { id: idComm, ...commData }]);
  }

  // Fonction pour gérer la soumissions du Form
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
    // on remet une chaîne de caractères vide 
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
              onClick={() => setAfficherComm(false)}
            >
              <CommentsDisabledOutlinedIcon color="inherit" />
            </IconButton>

            <FormComm
              handleSubmit={handleSubmit}
              commText={commText}
              setCommText={setCommText}
            ></FormComm>
          </div>
        ) : (
          <div className="Tips">
            <ErrorOutlineOutlinedIcon/>
            <p>Connecter vous pour ecrire un commentaire</p>
            <IconButton
              className="fermerCommentaire"
              variant="outlined"
              size="small"
              onClick={() => setAfficherComm(false)}
            >
              <CommentsDisabledOutlinedIcon color="inherit" />
            </IconButton>
          </div>
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
          <div className="Tips">L'image n'a pas encore de commentaire</div>
        )}
      </div>
    </div>
  );
}

export default ListeCommentaires;
