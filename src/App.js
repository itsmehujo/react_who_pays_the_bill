import React, { Component } from 'react';
import { MyContext } from "./context";
import { ToastContainer } from 'react-toastify';

import Stage1 from "./components/stage_1";
import Stage2 from "./components/stage_2";


import './styles/utilities/reset.scss';
import './styles/main.scss';

import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  static contextType = MyContext;

  render () {
    return ( <>
      { this.context.state.toast ? <ToastContainer/> : null }
      <div className={ `wrapper` }>
        <div className={ `wrapper-center` }>
          <h1>Who pays the bill ?</h1>
          { this.context.state.stage === 1 ? <Stage1/> : <Stage2/> }
        </div>
      </div>
    </> )
  }
}

export default App;
