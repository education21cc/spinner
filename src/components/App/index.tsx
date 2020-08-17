import React, { useReducer, useCallback, useState, useEffect} from 'react';
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
import Loading from '../playerBridge/Loading';


enum GameState {
  intro = 0,
  normal = 1 << 1,
  wrong = 1 << 2,
  correct = 1 << 3,
  complete = 1 << 4
}

const App = () => {
  const [state, setState] = useState(GameState.intro);
  const [data, setData] = useState<SpinnerData>();
  const [translations, setTranslations] = useState<{[key: string]: string}>({});
  const [correct, setCorrect] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(2);
  const [selectedItems, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  const handleRing0CardChanged = useCallback((index: number) => {
    dispatch({ type: 'updateRing0', index});
  }, []);
  
  const handleRing1CardChanged = useCallback((index: number) => {   
    dispatch({ type: 'updateRing1', index});
  }, []);
  
  const handleRing2CardChanged = useCallback((index: number) => {   
    dispatch({ type: 'updateRing2', index});
  }, []);


  useEffect(() => {
    // See if we are fed gamedata by 21ccplayer app, if not, go fetch it ourselves
    const timeout = setTimeout(() => {
      // @ts-ignore
      if(!window.GAMEDATA) {
        console.log("no bridge found, fetching fallback")
        // @ts-ignore 
        fetch(`${process.env.PUBLIC_URL}/config/spinner.json`)
        .then((response) => {
          response.json().then((data) => {
            handleGameDataReceived(data);
            setLoading(false);
          })
        })
      }
    }, 2000); // todo: maybe a less hacky way
    return () => { clearTimeout(timeout)};
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
    setData(data.content);
    setLoading(false);
    if (data.translations){
      const t = data.translations.reduce<{[key: string]: string}>((acc, translation) => {
        acc[translation.key] = translation.value;
        return acc;
      }, {});
      setTranslations(t);
    }
  }

  useEffect(() => {
    // Complete!
    if(state === GameState.normal && correct.length > 0 /*=== data.risks.length*/){
      setState(GameState.complete);
    }
  }, [correct, state]);



  return (
    <>
      <PlayerBridge gameDataReceived={handleGameDataReceived}/>
      {(loading) && (          
        <Loading />
      )}
      <div className="background">
      
        <div className="app-center">
          {(state === GameState.intro && !!data) &&
          (<IntroDialog
            onStart={handleStart}
            headerText={translations["intro-header"]}
            descriptionText={translations["intro-description"]}
            starsToGainText={translations["intro-stars-to-gain"]?.replace("{0}", data.risks.length.toString())}
            startText={translations["intro-start"]}
          />)}
          {state === GameState.complete && 
          (<CompleteDialog
            onTryAgain={handleReset}
            onExit={handleStart}
            total={data?.risks.length || 0}
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
