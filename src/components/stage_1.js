import React, { useContext, useRef, useState } from 'react';
import { MyContext } from '../context';
import '../styles/stage1.scss';


const Stage1 = () => {
  const textInput = useRef( '' );
  const context = useContext( MyContext );
  let [ error, setError ] = useState( null );


  const formSubmit = ( e ) => {
    e.preventDefault();
    const inputValue = textInput.current.value;

    if ( inputValue === '' ) {
      setError(
        <div className={ `divError` }>
          <span>Player name cannot be empty</span>
        </div> )
    } else if ( inputValue.length <= 2 ) {
      setError(
        <div className={ `divError` }>
          <span>Player name must have at least 3 characters</span>
        </div> )
    } else {
      setError( null )
      context.addPlayer( inputValue );
      textInput.current.value = ''
    }

  }
  const handleButtonClick = ( e ) => {
    e.preventDefault();
    if ( context.state.players.length < 2 ) {
      setError(
        <div className={ `divError` }>
          <span>Sorry, you need to add { context.state.players.length === 0 ? ' at least 2 players' : 'at least one more player' } to start the game</span>
        </div> )
    } else {
      context.getResult();
      context.changeStage();
    }
  }


  return ( <>
    <form className={ `submitNewPlayer` } onSubmit={ formSubmit }>
      <input
        type={ `text` }
        placeholder={ `Add player name` }
        name={ `playerName` }
        ref={ textInput }/>
      <button>Add player</button>
    </form>
    { error }
    { context.state.players.length > 0 ?
      <div id={ `players` }>
        { context.state.players.map( ( item, key ) => (
          <div className={ `player` } key={ key }>
            <span>{ item }</span>
            <span className={ `deletePlayer` } onClick={ () => context.deletePlayer( key ) }>X</span>
          </div>
        ) ) }
      </div> : null }

    <button id={ `goToNextStage` } onClick={ context.nextButton }>Play !</button>
  </> )
}


export default Stage1;