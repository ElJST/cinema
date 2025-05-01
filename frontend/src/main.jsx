import React from "react";
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { HeroUIProvider } from '@heroui/react'
import { BrowserRouter } from "react-router";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ToastProvider } from "@heroui/toast";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ToastProvider />
        <App />
      </NextThemesProvider>
    </HeroUIProvider>
  </BrowserRouter>
);
