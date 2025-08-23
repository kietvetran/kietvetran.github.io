import React from 'react';
import { createRoot } from 'react-dom/client';
import { Application } from './containers/Application/Application';
import './styles/theme.scss';
import './styles/unit.scss';
import './styles/card.scss';
import './styles/layout.scss';
import './styles/typography.scss';
import './styles/formElement.scss';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Application />);
