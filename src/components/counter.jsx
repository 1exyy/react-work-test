import React from 'react';
import './index.css'

const Counter = (props) => {
    return (
        <div className='counter'>
            <span>{props.time.hours}</span><span>:</span><span>{props.time.minutes}</span><span>:</span><span>{props.time.seconds}</span>
        </div>
    );
};

export default Counter;
