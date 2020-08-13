import React from 'react';
import { SpinnerData } from '../../data/SpinnerData';
import Ring from './Ring';
import './styles/spinner.scss';

interface Props {
  data: SpinnerData;
  onRing0IndexChanged: (index: number) => void;
  onRing1IndexChanged: (index: number) => void;
  onRing2IndexChanged: (index: number) => void;
}


const Spinner = (props: Props) => {
  const {
    onRing0IndexChanged,
    onRing1IndexChanged,
    onRing2IndexChanged
  } = props;
  return (
    <div className="spinner">
      <Ring 
        className="ring1"
        initialMove={6}
        data={props.data.risks} 
        onCardIndexChanged={onRing0IndexChanged}
        image={true}
        />
      <Ring 
        className="ring2" 
        initialMove={9}
        data={props.data.events} 
        onCardIndexChanged={onRing1IndexChanged}
        />
      <Ring 
        className="ring3"
        initialMove={14}
        data={props.data.effects} 
        onCardIndexChanged={onRing2IndexChanged}
      />
    </div>
  );
}

export default Spinner;