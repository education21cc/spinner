import React, { PropsWithChildren } from 'react';
import './styles/feedback.scss';

interface Props {
  mode: FeedbackMode;
  continueText: string;
  onContinue: () => void;
}

export enum FeedbackMode {
  correct = 'correct',
  wrong = 'wrong'
}

const Feedback = (props: PropsWithChildren<Props>) => {
  return (
    <div className={`feedback ${props.mode}`} >
      <span>{props.children}</span>
      <button className="grey button continue" onClick={props.onContinue}>
        {props.continueText}
      </button>
  </div>
  )
}

export default Feedback;