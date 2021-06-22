import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { withTranslation } from 'react-i18next';

// import Navbar  from './components/navbar/navbar';
// import Nav  from './components/UI/NavbarDrawer/NavbarDrawer';


import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs:['en','ar'],
    fallbackLng: "en",
    detection:{
        order: ['cookie', 'htmlTag','localStorage','path', 'subdomain'],
        caches:['cookie'],
    },
    backend:{
        loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react:{
        useSuspense:false
    }
  });
// function App() {
//   const { t } = useTranslation();

//   return <h2>{t('Welcome to React')}</h2>;
// }

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
