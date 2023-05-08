import './Aime.scss'
import { useContext } from 'react';
import { UtilisateurContext } from './Appli';

function Aime({aimes}) {

  const utilisateur = useContext(UtilisateurContext)

  function ajouterJaime(){
    //Si l'utilisateur est connecter il peut like sinon un pop qui vien te connecter
    //Verifier si l'utilisateur a deja liker aussi si il a liker il de-like &&
    if(utilisateur){
      console.log('aime ajouter');
      //avec array union

    }else{
      console.log('connecter vous pour liker la photo');
    }
  }

  return (
    <div className='Aime' onClick={ajouterJaime}>
        <span className="icone">&#128153;</span>
        <span className='compte'>{aimes}</span>
    </div>
  )
}

export default Aime