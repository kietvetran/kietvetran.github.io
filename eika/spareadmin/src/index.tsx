import React from 'react';
import { Provider } from 'react-redux';
import ConfigContextCreator from '@eika-infrastruktur/config-provider';
import ReactDOM from 'react-dom';
import configureStore from './configure-store';
import App from './app/App';
import { config } from './config';

const store = configureStore();

const ConfigContext = ConfigContextCreator(config);

ReactDOM.render(
    <ConfigContext state={config}>
        <Provider store={store}>
            <App />
        </Provider>
    </ConfigContext>,
    document.querySelector('#app-spareadmin')
);
