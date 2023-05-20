import './Aime.scss'
import { useContext, useState } from 'react';
import { JourContext, UtilisateurContext } from './Appli';
import { modifierAimeIMG } from '../code/image-modele';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

function Aime({aimes}) {
  const utilisateur = useContext(UtilisateurContext)
  const jour = useContext(JourContext)

  const [aime, setAime] = useState(aimes)
  const estAime = aime.includes(utilisateur?.uid);

  async function ajouterJaime(){
    if(utilisateur){
      await modifierAimeIMG(jour, utilisateur.uid, setAime)
    }else{
      console.log('connecter vous pour liker la photo');
    }
  }
  return (
    <div className={'Aime'} onClick={ajouterJaime}>
        <span className="icone">
          {
            estAime ?
            <FavoriteOutlinedIcon color='error'/>
            :
            <FavoriteBorderOutlinedIcon/>
          }
        </span>
        <span className='compte'>{aime.length}</span>
    </div>
  )
}

export default Aime