import React, { useState, MouseEvent } from 'react';
import { getRecognition } from '../../util';
import './Recognition.scss';

type State = {
    recognition: any;
    textList: string[];
}

const doesRecognitionSupported = (): boolean => {
    const isChrome = navigator.userAgent.includes('Chrome') && navigator.vendor.includes('Google Inc');
    return isChrome || navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('Android');    
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
    };

    const onNoMatch = () => {
        setState( (s: State) => ({...s, recognition: undefined}));
    };

    const onError = () => {
        setState( (s: State) => ({...s, recognition: undefined}));
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