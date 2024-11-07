// component that takes in a trip name and time and creates a countdown timer

import { useState, useEffect } from "react";

import {
	calculateSecondsLeft,
    getTimeInfoColorClass,
    niceHumanTime,
    calculateTimeLeft,
	encouragementAreaClasses,
    encouragementThingsToSay
} from './utils.js'

export default function TripCounter({ tripName, tripTime }) {
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(tripTime));
	const [secondsLeft, setSecondsLeft] = useState(calculateSecondsLeft(tripTime));
	const [newTaskText, setNewTaskText] = useState('');
    const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const interval = setInterval(() => {
			const calculatedTimeLeft = calculateTimeLeft(tripTime)
			const calculatedSecondsLeft = calculateSecondsLeft(tripTime) 
            
			// if no time left, clear interval
			if (calculatedSecondsLeft <= 0) clearInterval(interval)

			setTimeLeft(calculatedTimeLeft);
			setSecondsLeft(calculatedSecondsLeft);
		}, 1000);

		return () => clearInterval(interval)
	}, [tripTime]);

	function checkEnterKey(event) {
        if (event.key && event.key === 'Enter') {
            addNewTask();
        };
    }

    function addNewTask() {
        setTasks([...tasks, {text: newTaskText, done: false}]);
        setNewTaskText('');
    }

    function changeCheckbox(event) {
        const updatedTasks = Array.from(tasks);
        const index = event.target.id.match(/\d/)[0];

        updatedTasks[index].done = event.target.checked;
        setTasks(updatedTasks);
    }

    const listItems = tasks.map((task, index) => {
        let itemClass = "taskItem";
        if (task?.done) {
            itemClass += " done";
        }

        const id = `taskCheckbox_${index}`;

        return (
            <li className={itemClass} key={index}>
                <input
                    type="checkbox"
                    id={id}
                    onChange={changeCheckbox}
                    checked={task.done}
                />
                <label htmlFor={id}>{task.text}</label>
            </li>
        );
    });

	return (
		<div class="CountdownPage">
			<h2>{tripName}</h2>
			<div class={"timeInfo" + getTimeInfoColorClass(secondsLeft)}>
				<div>Out the door at {niceHumanTime(tripTime)}</div>
				<div>{timeLeft} LEFT!</div>
			</div>
			<div class="otherStuff">
                <div>
                    <h2>Things Left To Do</h2>
                </div>
                <div>
                    <ul>
                        {listItems}
                    </ul>
                </div>

                <div>
                    <input
                        class="newTask"
                        placeholder="Add tasks here"
                        value={newTaskText}
                        onChange={e => setNewTaskText(e.target.value)}
                        onKeyDown={checkEnterKey}
                    />
                    <button onClick={addNewTask}>+</button>
                </div>
                <div className={encouragementAreaClasses(secondsLeft)}>
                    {encouragementThingsToSay(secondsLeft)}
                </div>
            </div>
        </div>
	);
}