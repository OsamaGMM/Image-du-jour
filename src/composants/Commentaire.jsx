import React, { useContext } from 'react'
import Vote from './Vote'
import './Commentaire.scss'
import { JourContext, UtilisateurContext } from './Appli'
import { supprimerComm } from '../code/image-modele'

function Commentaire({id, idUtil, texte, nomUtil, votes}) {
  const utilisateur = useContext(UtilisateurContext)
  const jour = useContext(JourContext)

  //Pas sur si le await est n/cessaire?
  async function supprimerCommentaire(jour, idComm){
    await supprimerComm(jour,idComm)
  }

  return (
    <div>
      <p>{nomUtil}</p>
      <p>{texte}</p>
      <Vote idComm = {id} votes={votes}/>
      {
        utilisateur ?
        idUtil === utilisateur.uid ? 
        <button key={id}
        onClick={()=> supprimerCommentaire(jour, id)}>
        Delete
        </button>
          
        : ''
        : ''
      }
    </div>
  )
}

export default Commentaire