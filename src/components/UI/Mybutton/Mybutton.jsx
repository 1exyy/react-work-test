import React from 'react';
import  './Mybutton.css';
const Mybutton = (props) => {
    return (
        <button {...props} className="ui_btn">
            {props.children}
        </button>
    );
};

export default Mybutton;
