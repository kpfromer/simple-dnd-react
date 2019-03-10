import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DragSource from './DragSource';
import DropTarget from './DropTarget';
import DragDropContainer from './DragDropContainer';

class App extends Component {
  handleDrop = (sourceName, targetName) => {
    console.log(`Dragged ${sourceName} over ${targetName}`);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <DragDropContainer onDrop={this.handleDrop}>
          <DragSource name="a">
            {isDragging => (
              <span style={{color: isDragging ? 'green' : 'black'}}>a</span>
            )}
          </DragSource>
          <div style={{backgroundColor: 'blue'}}>
            <div>
              <DropTarget name="b">b</DropTarget>
            </div>
          </div>
        </DragDropContainer>
      </div>
    );
  }
}

export default App;
