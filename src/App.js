import React, { Component } from 'react';
import sudoku from 'sudoku-umd';
import Board from './Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialBoard: [],
      gameBoard: [],
      isDummy: true,
    }
    this.startGame = this.startGame.bind(this);
    this.getPlayersNumber = this.getPlayersNumber.bind(this);
  }
  componentWillMount() {
    this.createDummyBoard();
  }
  createDummyBoard() {
    const stringDummyBoard = sudoku.generate('hard').replace(/\./g, '?');
    const dummyBoard = stringDummyBoard.split('');
    this.setState({
      gameBoard: dummyBoard,
    });
  }
  getPlayersNumber(id, number) {
    const playersBoard = this.state.gameBoard.slice();
    playersBoard[id] = number;
    this.setState({
      gameBoard: playersBoard,
    });
  }
  startGame() {
    const stringOfBoard = sudoku.generate('easy');
    const boardToSolve = stringOfBoard.split('');
    this.setState({
      initialBoard: boardToSolve,
      gameBoard: boardToSolve,
      isDummy: false,
    });
  }
  restartGame() {

  }
  checkSolution() {

  }
  showSolution() {

  }
  render() {
    return (
      <div className="App">
        <h1>Let's play sudoku!</h1>
        <Board
          gameBoard={this.state.gameBoard}
          initialBoard={this.state.initialBoard}
          getPlayersNumber={this.getPlayersNumber}
          isDummy={this.state.isDummy}
        />
        <div className="buttons">
          <button onClick={this.startGame}>New Game</button>
          <button onClick={this.restartGame}>Restart</button>
          <button onClick={this.checkSolution}>Check</button>
          <button onClick={this.showSolution}>Solve</button>
        </div>
      </div>
    );
  }
}

export default App;
