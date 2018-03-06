import React, { Component } from 'react';
import sudoku from 'sudoku-umd';
import Board from './Board';
import Message from './Message';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialBoard: [],
      gameBoard: [],
      isDummy: true,
      message: '',
    }
    this.startGame = this.startGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.checkSolution = this.checkSolution.bind(this);
    this.printCheckSolution = this.printCheckSolution.bind(this);
    this.showSolution = this.showSolution.bind(this);
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
    // Prevent empty numbers
    if (number === '') {
      number = '.'
    }
    playersBoard[id] = number;
    this.setState({
      gameBoard: playersBoard,
      message: '',
    });
  }
  startGame() {
    const stringOfBoard = sudoku.generate('medium');
    const boardToSolve = stringOfBoard.split('');
    this.setState({
      initialBoard: boardToSolve,
      gameBoard: boardToSolve,
      isDummy: false,
      message: '',
    });
  }
  restartGame() {
    const restartedBoard = this.state.initialBoard;
    this.setState({
      gameBoard: restartedBoard,
      message: '',
    });
  }
  checkSolution() {
    const playersSolution = this.state.gameBoard.join('');
    return sudoku.solve(playersSolution);
  }
  printCheckSolution() {
    const result = this.checkSolution();
    let message = '';
    if (result) {
      message = 'So far so good!'
    } else {
      message = 'Some numbers are incorrect!'
    }
    //console.log(message);
    this.setState({
      message,
    });
  }
  showSolution() {
    const result = this.checkSolution();
    if (result) {
      const solvedSudoku = result.split('');
      this.setState({
        gameBoard: solvedSudoku,
      });
    } else {
      this.setState({
        message: 'Unfortunately this game cannot be solved. Try to put in different numbers :)'
      });
    }
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
          <button onClick={this.printCheckSolution}>Check</button>
          <button onClick={this.showSolution}>Solve</button>
        </div>
        <Message show={this.state.message}/>
      </div>
    );
  }
}

export default App;
