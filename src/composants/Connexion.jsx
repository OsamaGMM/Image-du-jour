import './Connexion.scss'
import { connexion } from '../code/utilisateur-modele';
import GoogleButton from 'react-google-button'

function Connexion() {
  //Composant pour la connexion de Google
  return (
    <div className='Connexion'>
      <GoogleButton label='Connexion avec Google' onClick={connexion} className='btn-google'>
				</GoogleButton>
        
    </div>
  )
}

export default Connexion