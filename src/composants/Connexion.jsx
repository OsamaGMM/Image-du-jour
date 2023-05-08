import './Connexion.scss'
import btnGoogle from '../images/btn-connexion-google.png';
import { connexion } from '../code/utilisateur-modele';

function Connexion() {
  return (
    <div>
      <button onClick={connexion} className='btn-google'>
					<img src={btnGoogle} alt="Logo Google" />
					Connexion avec Google
				</button>
    </div>
  )
}

export default Connexion