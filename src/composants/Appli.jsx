import "./Appli.scss";
import Aime from './Aime';
//import ControleDate from './ControleDate';
import Connexion from './Connexion';
import ListeCommentaires from './ListeCommentaires';
import Utilisateur from './Utilisateur';
//import imgTest from './imgTest.jpeg';
import { lireUneImage } from "../code/image-modele";
import { createContext, useEffect, useState } from "react";
import { observerEtatConnexion } from "../code/utilisateur-modele";
export const UtilisateurContext = createContext(null);


export default function Appli() {
  //usecontext pour utilisateur

  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(
      () => observerEtatConnexion(setUtilisateur),
      []
  );
  
  //usecontext pour le jour
  const [imageDJ, setImageDJ] = useState([]);

  useEffect(() => {
    async function chercherIdj() {
      const idj = await lireUneImage("20230426");
      setImageDJ(idj);
    }
    chercherIdj();
  }, []);
  //console.log(imageDJ);

  return (

    <div className="Appli">
    <UtilisateurContext.Provider value={utilisateur}>
      {
        //Si il un utilisateur est connecter on montre ce component sinon on montre la connexion
        utilisateur ?
          <Utilisateur/>
        :
        <Connexion/>
      }

      {imageDJ.map((image) => (
        <div key={image.url} className="idj">
          <div className="image"><img src={image.url} alt={image.description} /></div>
          <div className="img-info">
            <span>{image.description}</span>
            <Aime aimes={image.jaime.length}/>
            <span>{image.date}</span>
          </div>
        </div>
      ))}

      <ListeCommentaires/>



    </UtilisateurContext.Provider>
    </div>
  );
}
