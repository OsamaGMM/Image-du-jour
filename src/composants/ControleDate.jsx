import { formaterDateNumerique, formaterDateString } from "../code/util";
import "./ControleDate.scss";

function ControleDate({ jour, setJour }) {

  const premierJour = '20230515'

  function dateAujourdhui() {
    setJour(formaterDateNumerique(new Date()));
  }

  function dateHier(aujourdhui) {
    const nouvelleDate = formaterDateString(aujourdhui);
    nouvelleDate.setDate(nouvelleDate.getDate() - 1);
    setJour(formaterDateNumerique(nouvelleDate));
  }

  function dateDemain(aujourdhui) {
    const nouvelleDate = formaterDateString(aujourdhui);
    //On empeche l'utilisateur d'aller dans le future!
    if (formaterDateNumerique(new Date()) !== formaterDateNumerique(nouvelleDate)) {
      nouvelleDate.setDate(nouvelleDate.getDate() + 1);
    }
    setJour(formaterDateNumerique(nouvelleDate));
  }

  function premierDate() {
    setJour(premierJour)
  }

  return (
    <div className="ControleDate">
      <button onClick={() => premierDate()}>&#8606;</button>
      <button onClick={() => dateHier(jour)}>&#8592;</button>
      <button onClick={() => dateDemain(jour)}>&#8594;</button>
      <button onClick={() => dateAujourdhui()}>&#8608;</button>
      <span className="">{jour}</span>
    </div>
  );
}

export default ControleDate;
