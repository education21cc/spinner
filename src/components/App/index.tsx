import React from 'react';
import Spinner from '../Spinner';
import './styles/app.scss';
import './../styles/common.scss'
import { SpinnerData } from '../../data/SpinnerData';
import { GameData } from '../../data/GameData';
import CheckButton from '../CheckButton';


const data: GameData<SpinnerData> = {
  'userId': 1,
  'settings': {
      'muted': false
  },
  'content': {
      'risks': [
          'images/aanraking.png',
          'images/giftige.png',
          'images/machine.png',
          'images/snijden.png',
          'images/spanning.png',
          'images/vallen.png',
          'images/zuurstof.png',
      ],
      'events': [
          'Aanraking koude of hete goederen',
          'Vergiftiging',
          'Werken met gevaarlijke machines',
          'Jezelf snijden',
          'Aanraking geleiders onder spannnig',
          'Vallen van grote hoogte',
          'Zuurstof&shy;tekort',
      ],
      'effects': [
          'Brand&shy;wonden of bevriezing',
          'Inademing giftige stof',
          'Ernstige verwon&shy;dingen',
          'Snijwonden',
          'Brand&shy;wonden en electrocutie',
          'Verwon&shy;dingen aan het lichaam',
          'Verstikking',
      ]
  },
  'translations': [{
      'key': 'heartLeft',
      'value': 'Stop onmiddellijk met werken (eigen veiligheid)'
  }],
  'levelsCompleted': [{
      'level': 1,
      'score': 2,
      'maxScore': 2
  }]
};


const App = () => {
  return (
    <div className="background">
      <div className="center">
        <Spinner data={data.content} />
        <CheckButton />
      </div>
    </div>
  );
}

export default App;
