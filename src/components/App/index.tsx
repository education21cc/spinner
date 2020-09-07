import React, { useReducer, useCallback, useState, useEffect} from 'react';
import Spinner from '../Spinner';
import { SpinnerData } from '../../data/SpinnerData';
import CheckButton from '../CheckButton';
import { initialState, reducer } from './reducer';
import Feedback, { FeedbackMode } from '../Feedback';
import { GameData } from '../playerBridge/GameData';
import PlayerBridge from '../playerBridge';
import IntroDialog from '../dialogs/IntroDialog';
import CompleteDialog from '../dialogs/CompleteDialog';
import Loading from '../playerBridge/Loading';
import './styles/app.scss';
import './../styles/common.scss'


enum GameState {
  intro = 0,
  normal = 1 << 1,
  wrong = 1 << 2,
  correct = 1 << 3,
  complete = 1 << 4
}

const App = () => {
  const [state, setState] = useState(GameState.intro);
  const [data, setData] = useState<SpinnerData[]>();
  const [translations, setTranslations] = useState<{[key: string]: string}>({});
  const [correct, setCorrect] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [selectedItems, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  const handleRing0CardChanged = useCallback((value: string) => {
    dispatch({ type: 'updateRing0', value});
  }, []);
  
  const handleRing1CardChanged = useCallback((value: string) => {   
    dispatch({ type: 'updateRing1', value});
  }, []);
  
  const handleRing2CardChanged = useCallback((value: string) => {   
    dispatch({ type: 'updateRing2', value});
  }, []);


  useEffect(() => {
    // See if we are fed gamedata by 21ccplayer app, if not, go fetch it ourselves
    if (!process.env.REACT_APP_PLAYER_MODE) {
      console.log("no bridge found, fetching fallback...")
      // @ts-ignore 
      fetch(`${process.env.PUBLIC_URL}/config/spinner.json`)
      .then((response) => {
        response.json().then((data) => {
          handleGameDataReceived(data);
          setLoading(false);
        })
      })
    }
  }, []);

  const check = () => {
    if (!data) return;

    if (data.some((d) => d.ring1 === selectedItems[0] && d.ring2 === selectedItems[1] && d.ring3 === selectedItems[2])){
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

  const handleGameDataReceived = useCallback((data: GameData<SpinnerData[]> ) => {
    setData(data.content);
    setLoading(false);
    if (data.translations){
      const t = data.translations.reduce<{[key: string]: string}>((acc, translation) => {
        acc[translation.key] = translation.value;
        return acc;
      }, {});
      setTranslations(t);
    }

    // console.log(data.translations.map(t => `${t.key}`).join('\n'))
    // console.log(data.translations.map(t => t.value).join('\n'))
  }, []);

  useEffect(() => {
    // Complete!
    if(state === GameState.normal && correct.length === data?.length){
      setState(GameState.complete);
    }
  }, [correct, data, state]);

  return (
    <>
      <PlayerBridge gameDataReceived={handleGameDataReceived}/>
      {(loading) && (          
        <Loading />
      )}
      <div className="">
        <div className="app-center">
          {(state === GameState.intro && !!data) &&
          (<IntroDialog
            onStart={handleStart}
            headerText={translations["intro-header"]}
            descriptionText={translations["intro-description"]}
            starsToGainText={translations["intro-stars-to-gain"]?.replace("{0}", data.length.toString())}
            startText={translations["intro-start"]}
          />)}
          {state === GameState.complete && 
          (<CompleteDialog
            onTryAgain={handleReset}
            onExit={handleStart}
            total={data?.length || 0}
            mistakes={mistakes}
            headerText={translations["complete-header"]}
            scoreText={translations["complete-score"]}
            tryAgainText={translations["complete-try-again"]}
            exitText={translations["complete-exit"]}
          />)}
          {(data && !!(state & (GameState.normal | GameState.wrong | GameState.correct))) && (
            <Spinner 
              data={data}
              correct={correct}
              translations={translations}
              onClick={handleSpinnerClick}
              onRing0Changed={handleRing0CardChanged}
              onRing1Changed={handleRing1CardChanged}
              onRing2Changed={handleRing2CardChanged}
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
