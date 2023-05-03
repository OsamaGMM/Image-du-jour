import "./Appli.scss";
//import Aime from './Aime';
//import ControleDate from './ControleDate';
//import Connexion from './Connexion';
import ListeCommentaires from './ListeCommentaires';
//import Utilisateur from './Utilisateur';
//import imgTest from './imgTest.jpeg';
import { lireUneImage } from "../code/image-modele";
import { useEffect, useState } from "react";

export default function Appli() {
  //usecontext pour utilisateur
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
      {imageDJ.map((image) => (
        <div key={image.url} className="idj">
          <img src={image.url} alt={image.description} />
          <p>{image.description}</p>
          <p>{image.jaime.length}</p>
          <p>{image.date}</p>
        </div>
      ))}

      <ListeCommentaires/>

    </div>
  );
}
