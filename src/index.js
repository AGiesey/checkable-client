import React from 'react';
import ReactDOM from 'react-dom';
import './_styles/global.css';

import { App } from './App/App';

import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
