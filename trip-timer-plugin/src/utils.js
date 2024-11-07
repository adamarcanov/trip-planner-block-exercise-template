export const calculateSecondsLeft = time => {
	const departureTime = new Date();
	const currentTime = new Date();

	const [hours, minutes] = time.split(":");

	departureTime.setHours(hours);
	departureTime.setMinutes(minutes);
	departureTime.setSeconds(0);

	return Math.floor((departureTime - currentTime) / 1000); // millis to seconds
}

export const calculateTimeLeft = time => {
	const now = new Date();
	const then = new Date();

	const [hours, minutes] = time.split(":");

	now.setHours(hours);
	now.setMinutes(minutes);
	now.setSeconds(0);

	let secondsLeft = (now - then) / 1000; // millis

	if (secondsLeft > 3600) {
		let hours = Math.floor(secondsLeft / 3600);
		let minutes = Math.floor((secondsLeft % 3600) / 60);

		return `${hours} Hours and ${minutes} minutes`;
	} else if (secondsLeft > 60) {
		let minutes = Math.floor(secondsLeft / 60);
		let seconds = Math.floor(secondsLeft % 60);

		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	} else if ( secondsLeft <= 0 ) {
        return `No more time`;
    }

	return `${secondsLeft} SECONDS`;
}

export const niceHumanTime = time => {
	const now = new Date();

	const [hours, minutes] = time.split(":");

	now.setHours(hours);
	now.setMinutes(minutes);

	return now.toLocaleString("en-us", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
}

export const getTimeInfoColorClass = secondsLeft => {
    const colorMap = {
        60: "timeInfoRed",
        300: "timeInfoYellow"
    };

    return Object.entries(colorMap)
        .find(([threshold]) => secondsLeft < Number(threshold))?.[1] 
        ?? "timeInfoGreen";
}

export const encouragementAreaClasses = secondsLeft => {
    const classMap = {
        base: "encouragementArea",
        60: "encouragementAreaRed",
        300: "encouragementAreaYellow",
        default: "encouragementAreaGreen"
    };
    
    const colorClass = Object.entries(classMap)
        .filter(([key]) => key !== 'base' && key !== 'default')
        .find(([threshold]) => secondsLeft < Number(threshold))?.[1] 
        ?? classMap.default;
    
    return `${classMap.base} ${colorClass}`;
}

export const encouragementThingsToSay = secondsLeft => {
    const messageMap = {
        300: "Time to go!",        		// under 5 minutes
        600: "Almost time to leave!", 	// 5-10 minutes
        default: "Let's go!"       		// default message
    };

    const message = Object.entries(messageMap)
        .filter(([key]) => key !== 'default')
        .find(([threshold]) => secondsLeft < Number(threshold))?.[1]
        ?? messageMap.default;

    return message;
}
