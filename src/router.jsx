import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Dashboard from './pages/dashboard.jsx';
import Layout from './pages/layout';
import Account from './pages/account';
import { ResumeGenerator } from './pages/resume-generator.jsx';
import { StatsPage } from './pages/stats.jsx';

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
