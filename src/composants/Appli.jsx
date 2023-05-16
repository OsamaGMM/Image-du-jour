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
import { generer } from "../code/admin";
import { formaterDateNumerique } from "../code/util";
export const UtilisateurContext = createContext(null);
export const JourContext = createContext(null);


export default function Appli() {

  const jour = (formaterDateNumerique(new Date()))
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(
      () => observerEtatConnexion(setUtilisateur),
      []
  );

  console.log(jour);
  

  const [imageDJ, setImageDJ] = useState([]);

  useEffect(() => {
    async function chercherIdj() {
      const idj = await lireUneImage(jour);
      setImageDJ(idj);
    }
    chercherIdj();
  }, [jour]);
  //console.log(imageDJ);

  return (

    <div className="Appli">
      {/* <button onClick={generer}>generer</button> */}
    <UtilisateurContext.Provider value={utilisateur}>
      <JourContext.Provider value={jour}>
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
            <Aime aimes={image.aime}/>
            <span>{image.date}</span>
          </div>
        </div>
      ))}

      <ListeCommentaires/>


      </JourContext.Provider>

    </UtilisateurContext.Provider>
    </div>
  );
}
