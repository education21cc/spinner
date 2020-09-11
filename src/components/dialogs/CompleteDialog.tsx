import React, { useEffect } from 'react';
import BaseDialog from './BaseDialog';
import { ReactComponent as StarEmpty } from './../../common/images/star-empty.svg';
import { ReactComponent as StarFull } from './../../common/images/star-full.svg';
import './styles/completeDialog.scss';
import { send } from '../playerBridge';

interface Props {
  headerText: string;
  scoreText: string;
  tryAgainText: string;
  exitText: string;
  total: number;
  mistakes: number;
  onTryAgain: () => void;
  onExit: () => void;
}

const CompleteDialog = (props: Props) => {
  const { total, mistakes } = props;
  // const score = Mat.max(total - mistakes, 0); // after discusisng with marloeke we always award everything!
  const score = total;
  console.log(`mistakes: ${mistakes}`)
  console.log(`total: ${total}`)

  useEffect(() => {

    const level = 1;
    const maxScore = 0;
    // @ts-ignore
    const newData: GameData = { ...window.GAMEDATA};
    // fck it we just have only one level anwyay
    newData.levelsCompleted = [
        { level, score, maxScore }
    ]
    console.log(newData);
    send({
        type: 'setGameData',
        data: newData
    });
  }, [score]);

  const renderStars = () => {
    const result = [];
    for (let i = 0; i < total; i++) {
      result.push(
        <div key={`star${i}`}>
          <StarEmpty />
          {i < score && (<StarFull className="full"/>)}
        </div>
      )
    }
    return result;
  }

  return (
    <BaseDialog className="complete-dialog">
      {/* <div className="top">
        <h1>{props.headerText}</h1>
      </div>
      <div className="center">
        <section>{props.descriptionText}</section>
    </div>*/}
      <div className="block">
        <h1>{props.headerText}</h1>
      </div>
      <div className="block score">
        {props.scoreText
          .replace("{0}", score.toString())
          .replace("{1}", total.toString())
        }
      </div>
      <div className="block stars">
        {renderStars()}
      </div>
      <div className="bottom">
        {/* <StarEmpty className="star"/> */}
        <button className="green button" onClick={props.onTryAgain}>
          {props.tryAgainText}
        </button>
        <button className="red button" onClick={props.onExit}>
          {props.exitText}
        </button>
      </div>
    </BaseDialog>
  );
}

export default CompleteDialog;