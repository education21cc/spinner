import React, { useMemo } from 'react';
import { SpinnerData } from '../../data/SpinnerData';
import Ring from './Ring';
import './styles/spinner.scss';

interface Props {
  data: SpinnerData[];
  correct: string[];
  translations: {[key: string]: string};
  onClick: () => void;
  onRing0Changed: (value: string) => void;
  onRing1Changed: (value: string) => void;
  onRing2Changed: (value: string) => void;
}

const Spinner = (props: Props) => {
  const {
    data,
    correct,
    translations,
    onClick,
    onRing0Changed,
    onRing1Changed,
    onRing2Changed
  } = props;

  const ring1 = useMemo(() => {
    return data.reduce((acc: string[], value) => {
      if (acc.indexOf(value.ring1) === -1) {
        acc.push(value.ring1);
      }
      return acc;
    }, []);
  }, [data])

  const ring2 = useMemo(() => {
    return data.reduce((acc: string[], value) => {
      if (acc.indexOf(value.ring2) === -1) {
        acc.push(value.ring2);
      }
      return acc;
    }, []);
  }, [data])

  const ring3 = useMemo(() => {
    return data.reduce((acc: string[], value) => {
      if (acc.indexOf(value.ring3) === -1) {
        acc.push(value.ring3);
      }
      return acc;
    }, []);
  }, [data])

  return (
    <div className="spinner" onClick={onClick}>
      <Ring 
        className="ring1"
        disabled={correct}
        initialMove={6}
        data={ring1} 
        translations={translations}
        onCardChanged={onRing0Changed}
        image={true}
      />
      <Ring 
        className="ring2" 
        initialMove={9}
        data={ring2} 
        translations={translations}
        onCardChanged={onRing1Changed}
      />
      <Ring 
        className="ring3"
        initialMove={14}
        data={ring3} 
        translations={translations}
        onCardChanged={onRing2Changed}
      />
    </div>
  );
}

export default Spinner;