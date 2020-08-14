import React, { useReducer, useCallback, useState, useMemo, useEffect} from 'react';
import Spinner from '../Spinner';
import './styles/app.scss';
import './../styles/common.scss'
import { SpinnerData } from '../../data/SpinnerData';
import CheckButton from '../CheckButton';
import { initialState, reducer } from './reducer';
import Feedback, { FeedbackMode } from '../Feedback';
import { GameData } from '../playerBridge/GameData';
import PlayerBridge from '../playerBridge';
import IntroDialog from '../dialogs/IntroDialog';
import CompleteDialog from '../dialogs/CompleteDialog';


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
      ],
      'maxStars': 3
  },
  'translations': [{
      'key': 'heartLeft',
      'value': 'Stop onmiddellijk met werken (eigen veiligheid)'
  }, {
      'key': 'intro-header',
      'value': 'Spinner game'
  }, {
      'key': 'intro-start',
      'value': 'Start'
  }, {
      'key': 'intro-description',
      'value': 'In warehouse there are areas where it is not allowed to walk without helmet, because of danger and accidents. In warehouse there are areas where it is not allowed to walk without helmet, because of danger and accidents.'
  }, {
      'key': 'intro-stars-to-gain',
      'value': '{0} stars to gain'
  }, {
      'key': 'stars-to-gain',
      'value': '{0} stars to gain'
  }, {
      'key': 'complete-header',
      'value': 'Congratulations'
  }, {
      'key': 'complete-score',
      'value': 'Total score {0} / {1}'
  }, {
      'key': 'complete-try-again',
      'value': 'Try again'
  }, {
      'key': 'complete-exit',
      'value': 'Exit'
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
  correct = 1 << 3,
  complete = 1 << 4
}

const App = () => {
  const [state, setState] = useState(GameState.intro);
  const [correct, setCorrect] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(2);
  const [selectedItems, dispatch] = useReducer(reducer, initialState);

  const handleRing0CardChanged = useCallback((index: number) => {
    dispatch({ type: 'updateRing0', index});
  }, []);
  
  const handleRing1CardChanged = useCallback((index: number) => {   
    dispatch({ type: 'updateRing1', index});
  }, []);
  
  const handleRing2CardChanged = useCallback((index: number) => {   
    dispatch({ type: 'updateRing2', index});
  }, []);

  
  const check = () => {
    if (selectedItems[0] === selectedItems[1] && selectedItems[1] === selectedItems[2]){
      setState(GameState.correct);
      setCorrect([...correct, selectedItems[0]]);
    } else {
      setState(GameState.wrong);
      setMistakes(mistakes + 1);
    }
  }
  
  const handleContinue = () => {   
    setState(GameState.normal);
  }
  const handleStart = () => {   
    setState(GameState.normal);
  }

  const handleReset = () => { 
    setState(GameState.normal);
    setMistakes(0);
    setCorrect([]);
  }

  const handleSpinnerClick = () => {
    setState(GameState.normal);
  }

  const handleGameDataReceived = (data: GameData<SpinnerData> ) => {
    //setContent(data.content);
  }

  useEffect(() => {
    // Compelete!
    if(state === GameState.normal && correct.length === data.content.risks.length){
      setState(GameState.complete);
    }
  }, [correct, state]);

  const translations = useMemo(() => {
    return data.translations.reduce<{[key: string]: string}>((acc, translation) => {
      acc[translation.key] = translation.value;
      return acc;
    }, {})
  }, [data]);

  return (
    <>
      <PlayerBridge gameDataReceived={handleGameDataReceived}/>
      <div className="background">
      
        <div className="app-center">
          {state === GameState.intro && 
          (<IntroDialog
            onStart={handleStart}
            headerText={translations["intro-header"]}
            descriptionText={translations["intro-description"]}
            starsToGainText={translations["intro-stars-to-gain"].replace("{0}", data.content.risks.length.toString())}
            startText={translations["intro-start"]}
          />)}
          {state === GameState.complete && 
          (<CompleteDialog
            onTryAgain={handleReset}
            onExit={handleStart}
            total={data.content.risks.length}
            mistakes={mistakes}
            headerText={translations["complete-header"]}
            scoreText={translations["complete-score"]}
            tryAgainText={translations["complete-try-again"]}
            exitText={translations["complete-exit"]}
          />)}
          {(!!(state & (GameState.normal | GameState.wrong | GameState.correct))) && (
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
    </>
  );
}

export default App;
