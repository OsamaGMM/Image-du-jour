import { useContext, useState } from "react";
import "./Vote.scss";
import { modifierVote } from "../code/image-modele";
import { JourContext, UtilisateurContext } from "./Appli";
import ThumbDownOffAltRoundedIcon from '@mui/icons-material/ThumbDownOffAltRounded';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';

function Vote({ votes, idComm }) {
  // Updater à cause que les commentaires sont observer en tout temps
  const [lesVotes, setLesVotes] = useState(votes);

  // Contexte pour le jour et utilisateur 
  const jour = useContext(JourContext);
  const utilisateur = useContext(UtilisateurContext);

  // Fonction pour calculer le nombre de up et down votes d'un commentaire
  function calculerVote(votesComms) {
    return votesComms.reduce(
      (acc, val) => {
        if (val > 0) {
          acc.positif++;
        } else if (val < 0) {
          acc.negatif++;
        }
        return acc;
      },
      { positif: 0, negatif: 0 }
    );
  }

  // Fonction pour ajouter un vote
  async function ajouterVote(vote) {
    const nouveauVote = await modifierVote(jour, idComm, utilisateur.uid, vote);
    setLesVotes(nouveauVote);
  }

  return (
    <div className="Vote">
      <span onClick={() => ajouterVote(1)}>
        {
          <ThumbUpAltOutlinedIcon />
        }
        <p>: {calculerVote(Object.values(votes)).positif}</p>
      </span>

      <span onClick={() => ajouterVote(-1)}>
        <ThumbDownOffAltRoundedIcon /> 
        <p> : {calculerVote(Object.values(votes)).negatif}</p>
      </span>
    </div>
  );
}

export default Vote;
