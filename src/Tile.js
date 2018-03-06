import React from 'react';
import './Tile.css';

const Tile = (props) => {
  return (
    <input
      type={props.type}
      min='1'
      max='9'
      value={props.tile}
      onChange={props.handleNumber}
      disabled={props.disabled}
      className={'Tile'}
    />
  );
}

export default Tile;
