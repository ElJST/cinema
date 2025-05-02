import React from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow light">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
