// component that takes in a trip name and time and creates a countdown timer

import { useState, useEffect } from "react";
import { RichText } from "@wordpress/block-editor";
import { Popover, Button, TextControl } from "@wordpress/components";
import { edit } from "@wordpress/icons";

import {
	calculateSecondsLeft,
    getTimeInfoColorClass,
    niceHumanTime,
    calculateTimeLeft,
	encouragementAreaClasses,
	encouragementThingsToSay
} from './utils.js'

export default function TripCounterPreview({
	tripName,
	tripTime,
	setTripName,
	updateTripTime,
}) {
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(tripTime));
	const [secondsLeft, setSecondsLeft] = useState(calculateSecondsLeft(tripTime));
	const [isInvisible, setIsInvisble] = useState(true);
	const toggleVisible = () => setIsInvisble((state) => !state)

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

	return (
		<div class="CountdownPage">
			<RichText
				tagName="h2"
				value={tripName}
				onChange={setTripName}
				withoutInteractiveFormatting
				placeholder="Trip name"
				allowedFormats={[]}
			/>
			<div class={"timeInfo" + getTimeInfoColorClass(secondsLeft)}>
				<div>Out the door at {niceHumanTime(tripTime)}</div>
				<div style={{ position: "relative" }}>
					<span>{timeLeft} LEFT!</span>
					{
						<Button variant="tertiary" icon={edit} onClick={toggleVisible}>
							{!isInvisible && (
								<Popover onClose={toggleVisible}>
									<div className="time-popup-styles">
										<TextControl
											label="Trip Time"
											value={tripTime}
											placeholder="Enter trip time"
											onChange={updateTripTime}
											type="time"
										/>
									</div>
								</Popover>
							)}
						</Button>
					}
				</div>
			</div>
			<div class="otherStuff">
				<div className={encouragementAreaClasses(secondsLeft)}>{encouragementThingsToSay(secondsLeft)}</div>
			</div>
		</div>
	);
}