import React, { useEffect } from 'react';
import './popup.css';
import {
    Router,
    getCurrent,
    getComponentStack,
} from 'react-chrome-extension-router';
import PopupContent from './components/PopupContent';


const Popup = () => {
    useEffect(() => {
        const { component, props } = getCurrent();
        console.log(
            component
                ? `There is a component on the stack! ${component} with ${props}`
                : `The current stack is empty so Router's direct children will be rendered`
        );
        const components = getComponentStack();
        console.log(`The stack has ${components.length} components on the stack`);
    });
    return (
        <Router>
            <PopupContent />
        </Router>
    );
};

export default Popup;