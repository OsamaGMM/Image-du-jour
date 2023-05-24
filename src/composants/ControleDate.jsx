import { formaterDateNumerique, formaterDateString } from "../code/util";
import "./ControleDate.scss";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import IconButton from '@mui/material/IconButton';

function ControleDate({ jour, setJour, afficherComm, setAfficherComm }) {
  //Limite de la date
  const premierJour = "20230523";

  // Fonction pour retourner au présent
  function dateAujourdhui() {
    setJour(formaterDateNumerique(new Date()));
  }

  // Fonction pour reculer d'un jour
  function dateHier(aujourdhui) {
    const nouvelleDate = formaterDateString(aujourdhui);
    //Empêche de reculer dans le temps pour sauver les Avengers
    if(nouvelleDate.getDate() - 1 !== formaterDateString(premierJour).getDate() - 1){
      nouvelleDate.setDate(nouvelleDate.getDate() - 1);
    }
    setJour(formaterDateNumerique(nouvelleDate));
  }

  // Fonction pour avancer d'un jour
  function dateDemain(aujourdhui) {
    const nouvelleDate = formaterDateString(aujourdhui);
    //On empêche l'utilisateur d'aller dans le future!
    if (formaterDateNumerique(new Date()) !== formaterDateNumerique(nouvelleDate)) {
      nouvelleDate.setDate(nouvelleDate.getDate() + 1);
    }
    setJour(formaterDateNumerique(nouvelleDate));
  }

  // Fonction pour reculer au premier jour
  function premierDate() {
    setJour(premierJour);
  }

  const dateDisplay = formaterDateString(jour).toLocaleDateString('fr-CA',{dateStyle : 'long'})
  return (
    <div className="ControleDate">
      <span className="">{dateDisplay}</span>

      <IconButton size="large" color="inherit"  onClick={() => premierDate()}><KeyboardDoubleArrowLeftOutlinedIcon/></IconButton>
      <IconButton size="large" color="inherit" onClick={() => dateHier(jour)}><KeyboardArrowLeftOutlinedIcon/></IconButton>
      <IconButton size="large" color="inherit" onClick={() => dateDemain(jour)}><KeyboardArrowRightOutlinedIcon/></IconButton>
      <IconButton size="large" color="inherit" onClick={() => dateAujourdhui()}><KeyboardDoubleArrowRightOutlinedIcon/></IconButton>

      <IconButton
        color="inherit"
        onClick={() =>
          !afficherComm ? setAfficherComm(true) : setAfficherComm(false)
        }
      >
        <CommentOutlinedIcon />
      </IconButton>
    </div>
  );
}

export default ControleDate;
