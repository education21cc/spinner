import React, { PropsWithChildren } from 'react';
import './styles/introDialog.scss';
import BaseDialog from './BaseDialog';

interface Props {
  headerText: string;
  descriptionText: string;
  startText: string;
  onStart: () => void;
}

const IntroDialog = (props: Props) => {
  return (
    <BaseDialog className="intro-dialog">
      <div className="top">
        <h1>{props.headerText}</h1>
      </div>
      <div className="center">
        <section>{props.descriptionText}</section>
      </div>  
      <div className="bottom">
        <button className="green button start" onClick={props.onStart}>
          {props.startText}
        </button>
      </div>
    </BaseDialog>
  );
}

export default IntroDialog;