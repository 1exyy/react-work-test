import React, {useState} from 'react';
import MyButton from "./components/UI/Mybutton/Mybutton";
import Counter from "./components/counter";
import './App.css';

function App() {
    let lastClicked = 0;

    let isWait = false;
    let [counterInterval, setIntervalState] = useState('');
    let [isWork, setIsWork] = useState(false);
    let [timeObject, setTime] = useState({
        seconds: '00',
        minutes: '00',
        hours: '00'
    });

    // Старт / Стоп
    const counterHandler = () => {
        if (isWait === false) {
            if (!isWork) {
                setIsWork(isWork = true);
                startCounter()
            } else {
                setIsWork(isWork = false);
                setTime(timeObject = {
                    seconds: '00',
                    minutes: '00',
                    hours: '00'
                });
                clearInterval(counterInterval);
            }
        } else {
            startCounter();
        }
    }
    //Сброс времени
    const resetHandler = () => {
        clearInterval(counterInterval);
        setIntervalState('')
        setIsWork(isWork = false);
        setTime(timeObject = {
            seconds: '00',
            minutes: '00',
            hours: '00'
        });
        counterHandler()
    }

    //Отслеживание разницы кликов
    function checkClickDifference(duration) {
        let now = new Date().getTime();
        if (now > (lastClicked + duration)) {
            lastClicked = now;
            return true;
        } else {
            lastClicked = now;
            return false;
        }
    }

    //Кнопка ожидания
    const waitHandler = () => {
        if (!checkClickDifference(300)) {
            isWait = true;
            clearInterval(counterInterval);
        }
    }
    //Запуск секундомера
    const startCounter = () => {
        setIntervalState(counterInterval = setInterval(() => {
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
        }, 1000));
    }

    return (
        <div className="container">
                <Counter
                    time={timeObject}
                />
                <div className='d-flex-row'>
                    <MyButton onClick={counterHandler}>
                        Start / Stop
                    </MyButton>
                    <MyButton onClick={waitHandler}>
                        Wait
                    </MyButton>
                    <MyButton onClick={resetHandler}>
                        Reset
                    </MyButton>
                </div>
        </div>
    );
}

export default App;
