import { useEffect, useState } from "react"
import './ListeCommentaires.scss'
import Commentaire from "./Commentaire"
import { lireLesCommentaires } from "../code/image-modele";

function ListeCommentaires() {

  const [lesCommentaires, setLesCommentaires] = useState([])

  useEffect(() => {
    async function chercherLesCommentaires() {
      const comms = await lireLesCommentaires("20230426");
      console.log(comms);
      setLesCommentaires(comms);
    }
    chercherLesCommentaires();
  }, []);

  return (
    <div>
      ListeCommentaire
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
  )
}

export default ListeCommentaires