import React, { Component } from 'react';
import { toast } from 'react-toastify';


const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    stage: 1,
    players: [],
    result: '',
    toast: null
  };

  addPlayer = ( playerName ) => {
    playerName = playerName[ 0 ].toUpperCase() + playerName.slice( 1 ).toLowerCase();
    this.setState( prevState => ( {
      players: [
        ...prevState.players,
        playerName
      ]
    } ) )
  }

  deletePlayer = ( id ) => {
    this.setState( () => ( {
      players: this.state.players.splice( id, 1 )
    } ) )
  }

  getResult = () => {
    this.setState( () => ( {
      result: this.state.players[ Math.floor( Math.random() * this.state.players.length ) ]
    } ) )
  }

  changeStage = () => {
    this.state.stage === 1 ? this.setState( { stage: 2 } ) : this.setState( { stage: 1 } )
  }

  nextButtonHandler = () => {
    const { players } = this.state
    if ( players.length < 2 ) {
      this.setState( () => ( {
        toast: true
      } ) )
      toast.error( 'Wow so easy', {
        position: 'top-left'
      } );
      setTimeout( () => {
        this.setState( () => ( {
          toast: null
        } ) )
      }, 5000 )
    } else {
      this.getResult();
      this.changeStage();
    }
  }

  resetGame = () => {
    this.setState( () => ( {
      stage: 1,
      players: [],
      result: '',
      toast: null
    } ) )
    this.changeStage();
  }

  render () {
    return (
      <MyContext.Provider value={ {
        state: this.state,
        changeStage: this.changeStage,
        addPlayer: this.addPlayer,
        getResult: this.getResult,
        deletePlayer: this.deletePlayer,
        nextButton: this.nextButtonHandler,
        toast: this.state.toast,
        resetGame: this.resetGame
      } }>
        { this.props.children }
      </MyContext.Provider>
    )
  }
}

export { MyContext, MyProvider };