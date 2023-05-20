import './Connexion.scss'
import btnGoogle from '../images/btn-connexion-google.png';
import { connexion } from '../code/utilisateur-modele';

import GoogleButton from 'react-google-button'

function Connexion() {
  return (
    <div className='Connexion'>
      <GoogleButton label='Connexion avec Google' onClick={connexion} className='btn-google'>
					<img src={btnGoogle} alt="Logo Google" />
				</GoogleButton>
    </div>
  )
}

export default Connexion