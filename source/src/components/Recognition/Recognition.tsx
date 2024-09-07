import React, { useState, MouseEvent } from 'react';
import './Recognition.scss';

type State = {
    recognition: any;
    textList: string[];
}

const doesRecognitionSupported = (): boolean => {
    return true;
    /*
    // @ts-ignore
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    // @ts-ignore
    const speechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    return !!speechRecognition && !!speechGrammarList;
    */
}

const _getRecognition = (): any => {
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

const getRecognition = (): any => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    // @ts-ignore
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    // @ts-ignore
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    const colors = ['black', 'white'];
    var recognition = new SpeechRecognition();
    if (SpeechGrammarList) {
        // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
        // This code is provided as a demonstration of possible capability. You may choose not to use it.
        var speechRecognitionList = new SpeechGrammarList();
        var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
    }
    recognition.continuous = false;
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
        <div className="paragraph debug">
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



/*
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];

var recognition = new SpeechRecognition();
if (SpeechGrammarList) {
  // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
  // This code is provided as a demonstration of possible capability. You may choose not to use it.
  var speechRecognitionList = new SpeechGrammarList();
  var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
}
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
colors.forEach(function(v, i, a){
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
*/