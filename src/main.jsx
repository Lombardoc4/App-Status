import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';

import config from './amplifyconfiguration.json';
import router from './router.jsx';
Amplify.configure(config);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Authenticator.Provider>
            <RouterProvider router={router} />
        </Authenticator.Provider>
    </React.StrictMode>,
);
