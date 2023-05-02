import './Appli.scss';
import Aime from './Aime';
import ControleDate from './ControleDate';
import Connexion from './Connexion';
import ListeCommentaires from './ListeCommentaires';

export default function Appli() {
  return (
    <div className="Appli">
        <div>
          <img src="background" alt="background" />
          <p>description de l'image avec l'image du jour en background</p>
        </div>

        <Aime/>
        <ControleDate/>  

        <Connexion/>
        <ListeCommentaires/>
    </div>
  );
}
