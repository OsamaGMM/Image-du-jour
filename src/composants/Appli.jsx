import "./Appli.scss";
import Aime from "./Aime";
import ControleDate from "./ControleDate";
import Connexion from "./Connexion";
import ListeCommentaires from "./ListeCommentaires";
import Utilisateur from "./Utilisateur";
//import imgTest from './imgTest.jpeg';
import { lireUneImage } from "../code/image-modele";
import { createContext, useEffect, useState } from "react";
import { observerEtatConnexion } from "../code/utilisateur-modele";
import { generer } from "../code/admin";
import { formaterDateNumerique } from "../code/util";
export const UtilisateurContext = createContext(null);
export const JourContext = createContext(null);

export default function Appli() {
  //const jour = (formaterDateNumerique(new Date()))
  const [jour, setJour] = useState(formaterDateNumerique(new Date()));
  const [utilisateur, setUtilisateur] = useState(null);
  const [afficherComm, setAfficherComm] = useState(false);

  useEffect(() => observerEtatConnexion(setUtilisateur), []);

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
          <section className={`Tout ${afficherComm ? "commAfficher" : ""}`}>
            {imageDJ.map((image) => (
              <div key={image.url} className="idj">
                <div
                  className="background-image"
                  style={{ backgroundImage: `url(${image.url})` }}
                ></div>
                <div className="img-info">
                  <div className="infoContainer">
                    <span className="desc"><p>{image.description}</p></span>
                    <ControleDate
                      jour={jour}
                      setJour={setJour}
                      setAfficherComm={setAfficherComm}
                      afficherComm={afficherComm}
                    />
                  </div>

                  <Aime aimes={image.aime} />
                </div>
              </div>
            ))}

            {
              //Si il un utilisateur est connecter on montre ce component sinon on montre la connexion
              utilisateur ? <Utilisateur /> : <Connexion setAfficherComm={setAfficherComm} />
            }
          </section>

          {afficherComm ? (
            <ListeCommentaires
              afficherComm={afficherComm}
              setAfficherComm={setAfficherComm}
            />
          ) : (
            ""
          )}
        </JourContext.Provider>
      </UtilisateurContext.Provider>
    </div>
  );
}
