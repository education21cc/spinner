import React, { useReducer, useCallback, useState} from 'react';
import Spinner from '../Spinner';
import './styles/app.scss';
import './../styles/common.scss'
import { SpinnerData } from '../../data/SpinnerData';
import { GameData } from '../../data/GameData';
import CheckButton from '../CheckButton';
import { initialState, reducer } from './reducer';
import Feedback, { FeedbackMode } from '../Feedback';


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


enum GameState {
  intro = 0,
  normal = 1 << 1,
  wrong = 1 << 2,
  correct = 1 << 3
}

const App = () => {
  const [state, setState] = useState(GameState.normal);
  const [correct, setCorrect] = useState<number[]>([]);
  const [selectedItems, dispatch] = useReducer(reducer, initialState);


  const handleRing0CardChanged = useCallback((index: number) => {
    dispatch({ type: 'updateRing0', index});
    //setState(GameState.normal);
  }, []);
  
  const handleRing1CardChanged = useCallback((index: number) => {   
    dispatch({ type: 'updateRing1', index});
    //setState(GameState.normal);
  }, []);
  
  const handleRing2CardChanged = useCallback((index: number) => {   
    dispatch({ type: 'updateRing2', index});
    //setState(GameState.normal);
  }, []);

  
  const check = () => {
    if (selectedItems[0] === selectedItems[1] && selectedItems[1] === selectedItems[2]){
      setState(GameState.correct);
      setCorrect([...correct, selectedItems[0]]);

    } else {
      setState(GameState.wrong);
    }
  }
  
  const handleContinue = () => {   
    setState(GameState.normal);
  }

  const handleSpinnerClick = () => {
    setState(GameState.normal);
  }

  return (
    <div className="background">
      <div className="center">
        {state & (GameState.normal | GameState.wrong | GameState.correct) && (
          <Spinner 
            data={data.content}
            correct={correct}
            onClick={handleSpinnerClick}
            onRing0IndexChanged={handleRing0CardChanged}
            onRing1IndexChanged={handleRing1CardChanged}
            onRing2IndexChanged={handleRing2CardChanged}
          />
        )}
        {state === GameState.normal && <CheckButton onClick={check}/>}
        {state === GameState.correct && <Feedback mode={FeedbackMode.correct} onContinue={handleContinue}/>}
        {state === GameState.wrong && <Feedback mode={FeedbackMode.wrong} onContinue={handleContinue}/>}
      </div>
    </div>
  );
}

export default App;
