import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";

import awsExports from "./aws-exports";
import config from './amplifyconfiguration.json';

import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
Amplify.configure(config);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Authenticator.Provider>
            <RouterProvider router={router} />
        </Authenticator.Provider>
    </React.StrictMode>
);
