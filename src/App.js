import React, {useState} from 'react';
import MyButton from "./components/UI/Mybutton/Mybutton";
import {fromEvent, interval} from 'rxjs';
import Counter from "./components/counter";

import './App.css';

function App() {
    var lastClicked = 0;
    let isWait = false;
    let [counter, setCounter] = useState('')
    let [timeObject, setTime] = useState({
        seconds: '00',
        minutes: '00',
        hours: '00'
    });

    window.onload = () => {
        const startButton = document.querySelector('#start');
        const waitButton = document.querySelector('#wait');
        const resetButton = document.querySelector('#reset');

        fromEvent(startButton, 'click')
            .subscribe(() => {
                if (isWait) {
                    counter.isStopped = false;
                    isWait = false;
                    return;
                }

                if (!counter) {
                    iterator();
                } else {
                    setTime(timeObject = {seconds: '00', minutes: '00', hours: '00'});
                    counter.unsubscribe();
                    setCounter(counter = false);
                }
            });

        fromEvent(waitButton, 'click')
            .subscribe(() => {
                if (onClickCheck(300)) {
                    if (!isWait) {
                        counter.isStopped = true;
                        isWait = true;
                    }
                }
            });

        fromEvent(resetButton, 'click')
            .subscribe(() => {
                setTime(timeObject = {
                    seconds: '00',
                    minutes: '00',
                    hours: '00'
                });
                if (counter.closed) {
                    counter.closed = true;
                }
                iterator()
            });
    }

    function iterator() {
        setCounter(counter = interval(1000).subscribe((res) => {
            timeObject.seconds++
            if (timeObject.seconds === 60) {
                timeObject.seconds = 0;
                timeObject.minutes++
            }

            if (timeObject.minutes === 60) {
                timeObject.minutes = 0;
                timeObject.hours++
            }

            setTime({
                seconds: timeObject.seconds <= 9 ? '0' + timeObject.seconds : timeObject.seconds,
                minutes: (timeObject.minutes <= 9 && timeObject.minutes > 0) ? '0' + timeObject.minutes : timeObject.minutes,
                hours: (timeObject.hours <= 9 && timeObject.hours > 0) ? '0' + timeObject.hours : timeObject.hours
            });
        }))
    }


    function onClickCheck(del) {
        let timeNow = new Date().getTime();
        if (timeNow < (lastClicked + del)) {
            lastClicked = timeNow;
            return true;
        } else {
            lastClicked = timeNow;
            return false;
        }

    }

    return (
        <div className="container">
            <Counter
                time={timeObject}
            />
            <div className='d-flex-row'>
                <MyButton id="start">
                    Start / Stop
                </MyButton>
                <MyButton id="wait">
                    Wait
                </MyButton>
                <MyButton id="reset">
                    Reset
                </MyButton>
            </div>
        </div>
    );
}

export default App;
