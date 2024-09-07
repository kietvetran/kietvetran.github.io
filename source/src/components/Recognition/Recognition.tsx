import React, { useState, MouseEvent } from 'react';
import './Recognition.scss';

type State = {
    recognition: any;
    textList: string[];
}

const doesRecognitionSupported = (): boolean => {
    const isChrome = navigator.userAgent.includes('Chrome') && navigator.vendor.includes('Google Inc');
    return isChrome || navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('Android');    
}

const getRecognition = (): any => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    // @ts-ignore
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    // @ts-ignore
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    const names: Array<string> = ['John', 'Eric', 'CCH', 'Jacky', 'Kit']; //['black', 'white'];
    const recognition = new SpeechRecognition();
    if (SpeechGrammarList && names.length) {
        // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
        // This code is provided as a demonstration of possible capability. You may choose not to use it.
        const speechRecognitionList = new SpeechGrammarList();
        const grammar = '#JSGF V1.0; grammar names; public <name> = ' + names.join(' | ') + ' ;'
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