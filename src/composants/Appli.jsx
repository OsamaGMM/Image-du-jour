import "./Appli.scss";
import Aime from "./Aime";
import ControleDate from "./ControleDate";
import Connexion from "./Connexion";
import ListeCommentaires from "./ListeCommentaires";
import Utilisateur from "./Utilisateur";
import { lireUneImage } from "../code/image-modele";
import { createContext, useEffect, useState } from "react";
import { observerEtatConnexion } from "../code/utilisateur-modele";
// import { generer } from "../code/admin";
import { formaterDateNumerique } from "../code/util";
export const UtilisateurContext = createContext(null);
export const JourContext = createContext(null);

export default function Appli() {
  //État pour le jour, utilisateur et afficher les commentaires
  const [jour, setJour] = useState(formaterDateNumerique(new Date()));
  const [utilisateur, setUtilisateur] = useState(null);
  const [afficherComm, setAfficherComm] = useState(false);

  //Observe l'État de l'utilisateur
  useEffect(() => observerEtatConnexion(setUtilisateur), []);

  //État de l'image et 
  // useEffect pour aller la chercher quand la page load
  const [imageDJ, setImageDJ] = useState([]);
  useEffect(() => {
    async function chercherIdj() {
      const idj = await lireUneImage(jour);
      setImageDJ(idj);
    }
    chercherIdj();
  }, [jour]);

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
