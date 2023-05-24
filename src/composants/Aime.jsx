import "./Aime.scss";
import { useContext, useState } from "react";
import { JourContext, UtilisateurContext } from "./Appli";
import { modifierAimeIMG } from "../code/image-modele";
import Toast from "../UI-composants/Toast";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { ToastContainer } from "react-toastify";

function Aime({ aimes }) {
  //Context pour l'utilisateur et le jour
  const utilisateur = useContext(UtilisateurContext);
  const jour = useContext(JourContext);
  //État pour gérer les Toast
  const [showToast, setShowToast] = useState(false);
  //État pour gérer les aimes
  const [aime, setAime] = useState(aimes);
  const estAime = aime.includes(utilisateur?.uid);

  //Fonction pour ajouter un aime sur une image
  async function ajouterJaime() {
    if (utilisateur) {
      await modifierAimeIMG(jour, utilisateur.uid, setAime);
    } else {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);     }
  }
  return (
    <><div className={"Aime"} onClick={ajouterJaime}>
      <span className="icone">
        {estAime ? (
          <FavoriteOutlinedIcon color="error" />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </span>
      <span className="compte">{aime.length}</span>


    </div><section>
      {/* Toast */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="dark" />
        {<Toast showToast={showToast}/>}
      </section></>
    
  );
}

export default Aime;
