import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";

import ErrorPage from "./pages/ErrorPage";
import Payments from "./pages/PaymentsPage";
import ActivationPage from "./pages/ActivationPage"
import VerifyOtpPage from "./pages/VerifyOtpPage";
import QRHandler from "./components/QrHandler";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {index: true, element: <QRHandler />},
            {path: "/codes", element: <HomePage />},
            {path:"/payments", element: <Payments/>},
            {path:"/activate", element: <ActivationPage />},
            {path: "/verify-otp", element: <VerifyOtpPage />}
           

           
        ]
    }
])


export default router;