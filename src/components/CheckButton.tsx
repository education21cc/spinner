import React from 'react';


interface Props {
  onClick: () => void;
}

const CheckButton = (props: Props) => {
  return (
    <button className="green button check" onClick={props.onClick}>
      Check
    </button>
  )
}

export default CheckButton;