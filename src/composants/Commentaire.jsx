import React from 'react'
import Vote from './Vote'
import './Commentaire.scss'

function Commentaire({id, text, nomUtil, votes}) {

  // console.log(vote);
  
  return (
    <div>
      <p>{nomUtil}</p>
      <p>{text}</p>
      <Vote votes={votes}/>
    </div>
  )
}

export default Commentaire