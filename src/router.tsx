import { createBrowserRouter } from 'react-router-dom';

import App from './App.js';
import Login from './components/Login.js';
import Layout from './layout.js';
import Account from './pages/account.js';
import Dashboard from './pages/dashboard.js';
import { ResumeGenerator } from './pages/resume-generator.js';
import { StatsPage } from './pages/stats.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/*',
        element: <Layout />,
        children: [
            {
                path: 'account',
                element: <Account />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'stats',
                element: <StatsPage />,
            },
            {
                path: 'saved',
                element: <h1>Saved for later</h1>,
            },
            {
                path: 'resume-generator',
                element: <ResumeGenerator />,
            },
            {
                path: 'interview-prep',
                element: <h1>Interview Prep</h1>,
            },
        ],
    },
]);

export default router;
