import React from 'react';
import './Message.css';

const Message = (props) => {
  return (
    <p>
      {props.show}
    </p>
  );
}

export default Message;
