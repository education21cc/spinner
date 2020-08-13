import React from 'react';
import { SpinnerData } from '../../data/SpinnerData';
import Ring from './Ring';
import './styles/spinner.scss';

interface Props {
  data: SpinnerData;
}

const Spinner = (props: Props) => {
  return (
    <div className="spinner">
      <Ring className="ring1" data={props.data.risks} image={true}/>
      <Ring className="ring2" data={props.data.events} />
      <Ring className="ring3" data={props.data.effects} />
    </div>
  );
}

export default Spinner;