import React, { useState, MouseEvent } from 'react';
import './Recognition.scss';

type State = {
  recognition: any;
  textList: string[];
}

const doesRecognitionSupported = (): boolean => {
  // @ts-ignore
  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  // @ts-ignore
  const speechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  return !!speechRecognition && !!speechGrammarList;
}

const getRecognition = (): any => {
  // @ts-ignore
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  // @ts-ignore
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  //let SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

  // @ts-ignore
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  // @ts-ignore
  // const grammarList = SpeechGrammarList ? new SpeechGrammarList() : null;
  //let recognitionEvent = SpeechRecognitionEvent ? new SpeechRecognitionEvent() : null;

  //recognition.grammars = grammarList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  return recognition;
}

export default function Recognition() {
  const [state, setState] = useState<State>({
    recognition: undefined,
    textList: [],
  });

  const onResult = (e: any) => {
    const last = e.results.length - 1;
    const text = e.results[last][0].transcript;
    setState({...state, textList: [text]});
  };

  const onSpeechEnd = () => {
    setState( (s: State) => ({...s, recognition: undefined}));
    // setState({...state, recognition: undefined});
  };

  const onNoMatch = () => {
    setState( (s: State) => ({...s, recognition: undefined}));
    // setState({...state, recognition: undefined});
  };

  const onError = () => {
    setState( (s: State) => ({...s, recognition: undefined}));
    // setState({...state, recognition: undefined});
  };

  const onAction = () => {
    if ( state.recognition ) {
      state.recognition.stop();
      setState({...state, recognition: undefined });
    } else {
      const recognition = getRecognition();
      recognition.onresult    = onResult;
      recognition.onspeechend = onSpeechEnd;
      recognition.onnomatch   = onNoMatch;
      recognition.onerror     = onError;

      recognition.start();
      setState({ recognition, textList: []});
    }
  };

  return <div className="recognition-wrapper">
    <h2>Recognition</h2> 
    <div className="paragraph">
      { doesRecognitionSupported() ?
        <button className={`button -${state.recognition ? 'secondary' : 'primary'}`} onClick={onAction}>
          {state.recognition ? 'Stop' : 'Start'}
        </button>
        :
        <div className="message-wrapper -info">The browser does not support recognition.</div>
      }
    </div>
    <ul className="text-output-wrapper">
      { state.textList.map( (text: string, i: number) => (
          <li key={`text-${i}`}>{text}</li>
        ))}
    </ul>
  </div>;
}
