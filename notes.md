1. collect multiplicated helper functions from TripCounter.js and "preview.js" and store them in one file

2. changed preview.js filename to TripCounterPreview.js and function name from TripCounter to TripCounterPreview for more clear view in files composition

3. refactoring getTimeInfoColorClass by replacing if/else chain with object mapping and single threshold check

4. refactoring encouragementAreaClasses similar to getTimeInfoColorClass + pushing classes to one array on many conditions that are true at same time, this could go easly wrong

5. if no more time is left there's no need to continue the interval in the background, also im not sure when timer is working on 1 second interval if it need to update each 500ms, changed to 1000ms

## for later improvements:
1. avoid multiplication in useEffect part with interval in TripCounter and TripCounterPreview

2. calculateSecondsLeft function could be a part of calculateTimeLeft function

3. getTimeInfoColorClass, encouragementAreaClasses, encouragementThingsToSay are similar and could run as one function with different objects. Maybe create Class with methods would make things more clear.

4. background classes could change with encouragement text inside at same time. It makes even easier to unify encouragementAreaClasses and encouragementThingsToSay functions

5. popup to set time could be more interactive with mouse, its dissapearing on click so i think its a thing to improve

