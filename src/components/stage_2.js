import React, { useContext } from 'react';
import { MyContext } from '../context';
import '../styles/stage2.scss';

const Stage2 = () => {
  const context = useContext( MyContext );


  return ( <>
    <h2 className={ `title` }>The loser is :</h2>
    <span id={ `loser` }>{ context.state.result }</span>
    <div id={ `controls` }>
      <button id={ `tryAgain` } onClick={ context.getResult }>Change the loser</button>
      <button onClick={ context.resetGame }>Go Back</button>
    </div>
  </> )
}

export default Stage2;