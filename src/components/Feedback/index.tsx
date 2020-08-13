import React from 'react';
import './styles/feedback.scss';

interface Props {
  mode: FeedbackMode;
  onContinue: () => void;
}

export enum FeedbackMode {
  correct = 'correct',
  wrong = 'wrong'
}

const Feedback = (props: Props) => {
  return (
    <div className={`feedback ${props.mode}`} >
      <span>{props.mode}</span>
      <button className="grey button continue" onClick={props.onContinue}>
        Continue
      </button>
  </div>
  )
}

export default Feedback;