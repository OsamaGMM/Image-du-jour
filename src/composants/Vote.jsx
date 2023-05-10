import { useState } from 'react';
import './Vote.scss'
import { useEffect } from 'react';

function Vote({votes}) {
  
  //peut etre utile
  const [lesVotes, setLesVotes] = useState([])

  //console.log(calculerVote(Object.values(votes)).positif);

  function calculerVote(votesComms){
    //console.log("vote commms ", votesComms);
    return votesComms.reduce((acc, val) => {
      if (val > 0) {
        acc.positif++;
      } else if (val < 0) {
        acc.negatif++;
      }
      return acc;
    }, { positif: 0, negatif: 0 });
  }

  return (
    <div>
      <span>&#128077; : {calculerVote(Object.values(votes)).positif}</span>
      <span>&#128078; : {calculerVote(Object.values(votes)).negatif}</span>
    </div>
  )
}

export default Vote