import React from "react";
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { HeroUIProvider } from '@heroui/react'
import { BrowserRouter } from "react-router";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ToastProvider } from "@heroui/toast";
import { AuthProvider } from './context/AuthContext';
import 'leaflet/dist/leaflet.css';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <AuthProvider>
          <ToastProvider />
          <App />
        </AuthProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  </BrowserRouter>
);
