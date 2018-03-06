import React, { Component } from 'react';
import Tile from './Tile';
import './Board.css';

class Board extends Component {
  findInitialNumber(index) {
    if (this.props.initialBoard[index] === '.') {
      return false;
    } else {
      return true;
    }
  }
  render() {
    const isDummy = this.props.isDummy;
    let setTile = null;
    if (isDummy) {
      setTile = this.props.gameBoard.map((tile, index) =>
        <Tile 
          key={index} 
          tile={tile} 
          type='text' 
          disabled={isDummy} 
        />
      )
    } else {
      setTile = this.props.gameBoard.map((tile, index) =>
        <Tile 
          key={index} 
          id={index} 
          tile={tile === '.' ? '' : tile} 
          type='number' 
          handleNumber={(e) => this.props.getPlayersNumber(index, e.target.value)} 
          disabled={this.findInitialNumber(index)} 
        />
      )
    }
    return (
      //console.log(this.props.gameBoard),
      //console.log(this.props.initialBoard),
      <div className='board'>
        {
          setTile
        }
      </div>
    );
  }
}

export default Board;