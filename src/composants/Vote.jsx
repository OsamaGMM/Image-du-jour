import { useState } from 'react';
import './Vote.scss'
import { useEffect } from 'react';

function Vote(votes) {
  
  const [lesVotes, setLesVotes] = useState(0)

  console.log("cisnvasncosa",Object.values(votes));

  const votesCalc = Object.values(votes).reduce((acc, curr) => acc + curr.idUtil, 0);
  //(valInitiale, eltSuivant) => valInitiale + eltSuivant.qte,0
  console.log("vote calc",votesCalc);

  useEffect(()=>{
    setLesVotes(votesCalc)
  },[votesCalc])

  return (
    <div>
      <p>{lesVotes}</p>
    </div>
  )
}

export default Vote