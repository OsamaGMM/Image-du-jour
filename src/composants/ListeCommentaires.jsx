import { useContext, useEffect, useState } from "react"
import './ListeCommentaires.scss'
import Commentaire from "./Commentaire"
import { lireLesCommentaires } from "../code/image-modele";
import { UtilisateurContext } from "./Appli";

function ListeCommentaires() {
  const utilisateur = useContext(UtilisateurContext)

  const [lesCommentaires, setLesCommentaires] = useState([])


  useEffect(() => {
    async function chercherLesCommentaires() {
      const comms = await lireLesCommentaires("20230426");
      console.log(comms);
      setLesCommentaires(comms);
    }
    chercherLesCommentaires();
  }, []);

  function ajouterUnCommentaire(){
    
  }

  return (
    <div className="ListeCommentaires">
      {
        //Son propre component eventuellement
        utilisateur ? 

        <div className="ajouterComm" style={{border : 'solid 1px red'}}>
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