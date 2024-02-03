import React, { useState } from "react";
import Home from './Home';
import Type from './Type';
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Objects from "./Objects";
import Object from "./Object";
import Contacts from "./Contacts";
import Sell from "./Sell";
import Cart from "./Cart";

function AnimatedRoutes() {
    const location = useLocation();
    const [isExitComplete, setIsExitComplete] = useState(true);

    const handleExitComplete = () => {
        setIsExitComplete(true);
    };

    return (
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
            {isExitComplete && (
                <Routes location={location} key={location.pathname}>
                    <Route path='/' element={<Home />} />
                    <Route path='/:type' element={<Type />} />
                    <Route path='/:type/:category' element={<Objects />} />
                    <Route path='/:type/:category/:id' element={<Object />} />
                    <Route path='/contacts' element={<Contacts />} />
                    <Route path='/sell' element={<Sell />} />
                    <Route path='/cart' element={<Cart />} />
                </Routes>
            )}
        </AnimatePresence>
    )
}
export default AnimatedRoutes;