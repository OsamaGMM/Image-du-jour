import { useContext, useEffect, useState } from "react"
import './ListeCommentaires.scss'
import Commentaire from "./Commentaire"
import { creerCommentaire, lireLesCommentaires, observer } from "../code/image-modele";
import { UtilisateurContext, JourContext } from "./Appli";

function ListeCommentaires() {
  const utilisateur = useContext(UtilisateurContext)
  const jour = useContext(JourContext)

  const [lesCommentaires, setLesCommentaires] = useState([])


    // //Mettre le jour en param
    //Voir les changement des commentaires en temps reel
    // useEffect(() => {
    //   async function chercherLesCommentaires() {
    //     observer(jour, setLesCommentaires)
    //   }
    //   chercherLesCommentaires();
    // }, []);

  useEffect(() => {
    async function chercherLesCommentaires() {
      const comms = await lireLesCommentaires(jour);
      //console.log(comms);
      setLesCommentaires(comms);
    }
    chercherLesCommentaires();
  }, [jour]);//Jour comme dependencie

  //jour,idUtil, nomUtil,texte,timestamp,vote? un map ->[idUil: 0]
  async function ajouterUnCommentaire(jour,idUtil,nomUtil,texte,timestamp,votes){
    const commData = {idUtil,nomUtil,texte,timestamp,votes}
    const idComm = await creerCommentaire(jour, commData);
    setLesCommentaires([...lesCommentaires,{id : idComm, ...commData}])
  }


  return (
    <div className="ListeCommentaires">
      {
        //Son propre component eventuellement
        utilisateur ? 

        <div className="ajouterComm">

          <button onClick={() => ajouterUnCommentaire('20230426',utilisateur.uid,utilisateur.displayName,'blablabla','321532532153',{})}>AJOUTER COMMENTAIRE</button>

          <p>{utilisateur.displayName}</p>
          <form action="" onSubmit={ajouterUnCommentaire}>
            <input type="text" />
          </form>
        </div>
        :
        <div>
          Connecter vous pour ecrire un commentaire
        </div>
      }
      <div className="lesCommentaire">
      {
        (lesCommentaires.length !== 0) ?

        lesCommentaires.map(comm => (
          <Commentaire 
            key={comm.id} 
            id={comm.id} 
            texte={comm.texte} 
            nomUtil={comm.nomUtil} 
            votes={comm.votes}
          />
        ))
        :
        <div>L'image n'a pas encore de commentaire</div>
      }
      </div>
    </div>
    
  )
}

export default ListeCommentaires