import React, { useContext } from 'react'
import './Utilisateur.scss'
import { deconnexion } from '../code/utilisateur-modele'
import { UtilisateurContext } from './Appli'


function Utilisateur() {

  const utilisateur = useContext(UtilisateurContext)

  return (
    <div className='Utilisateur'>
				<p>{utilisateur.displayName}</p>
        <button onClick={deconnexion}> deconnexion</button>
    </div>


  )
}

export default Utilisateur