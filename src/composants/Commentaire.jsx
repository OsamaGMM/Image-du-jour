import React from 'react'
import Vote from './Vote'
import './Commentaire.scss'

function Commentaire({id, texte, nomUtil, votes}) {

  return (
    <div>
      <p>{nomUtil}</p>
      <p>{texte}</p>
      <Vote idComm = {id} votes={votes}/>
    </div>
  )
}

export default Commentaire