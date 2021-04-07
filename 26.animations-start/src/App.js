import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    isModalOpen: false,
    showBlock: false
  }
  showModal = () => {
    this.setState({isModalOpen: true});
  }
  closeModal = () => {
    this.setState({isModalOpen: false});
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button className="Button" onClick={() => this.setState(prevState => ({showBlock: !prevState.showBlock}))}>Toggle</button>
        { this.state.showBlock ? 
          <div style={{
              backgroundColor:'red',
              width:100,
              height:100,
              margin:'auto'
            }}></div> 
          : null
        }
        {this.state.isModalOpen ? <Modal show={this.state.isModalOpen} closed={this.closeModal}/> : null }
        {this.state.isModalOpen ? <Backdrop show={this.state.isModalOpen} /> : null}
        <button className="Button" onClick={this.showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
