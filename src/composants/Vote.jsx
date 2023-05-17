import { useContext, useState } from 'react';
import './Vote.scss'
import { useEffect } from 'react';
import { modifierVote } from '../code/image-modele';
import { JourContext, UtilisateurContext } from './Appli';

function Vote({votes, idComm}) {
  //peut etre utile
  const [lesVotes, setLesVotes] = useState(Object.values(votes))
  console.log("vndksjanvjsdav",lesVotes);

  const jour = useContext(JourContext)
  const utilisateur = useContext(UtilisateurContext)

  //console.log(calculerVote(Object.values(votes)).positif);

  function calculerVote(votesComms){
    //console.log("vote commms ", votesComms);    
    return votesComms.reduce((acc, val) => {
      if (val > 0) {
        acc.positif++;
      } else if (val < 0) {
        acc.negatif++;
      }
      return acc;
    }, { positif: 0, negatif: 0 });
  }

  async function ajouterVote(vote){
    const nouveauVote = await modifierVote(jour, idComm, utilisateur.uid, vote)
    setLesVotes(nouveauVote)
    console.log(nouveauVote);
  }

  return (
    <div className='Vote'>
      <span onClick={() => ajouterVote(1)} >&#128077; : {calculerVote(Object.values(votes)).positif}</span>
      <span onClick={() => ajouterVote(-1)} >&#128078; : {calculerVote(Object.values(votes)).negatif}</span>
    </div>
  )
}

export default Vote