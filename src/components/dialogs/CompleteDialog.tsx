import React from 'react';
import BaseDialog from './BaseDialog';
import { ReactComponent as StarEmpty } from './../../common/images/star-empty.svg';
import './styles/completeDialog.scss';

interface Props {
  headerText: string;
  descriptionText: string;
  startText: string;
  onStart: () => void;
}

const CompleteDialog = (props: Props) => {
  return (
    <BaseDialog className="intro-dialog">
      <div className="top">
        <h1>{props.headerText}</h1>
      </div>
      <div className="center">
        <section>{props.descriptionText}</section>
      </div>  
      <div className="bottom">
        <StarEmpty className="star"/>
        <button className="green button start" onClick={props.onStart}>
          {props.startText}
        </button>
      </div>
    </BaseDialog>
  );
}

export default CompleteDialog;