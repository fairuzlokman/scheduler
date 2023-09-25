import React, { useState } from 'react';

const WeekDisplay = () => {
    const createTimeSlots = () => {
        const timeSlots = [];

        let startTime = new Date();
        startTime.setHours(0, 0, 0, 0);

        for (let i = 0; i < 24; i++) {
            const formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            timeSlots.push(formattedTime);
            startTime.setHours(startTime.getHours() + 1);
        }

        return timeSlots;
    };

    const dateFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    const getStartOfWeek = () => {
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay();
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - dayOfWeek); // Set to Sunday
        return startOfWeek;
    };

    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(getStartOfWeek());
    const [selectedDate, setSelectedDate] = useState({ date: new Date().toLocaleDateString('en-US', dateFormatOptions), time: null });

    const getWeekDates = (startOfWeek) => {
        const daysOfWeek = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            daysOfWeek.push(date.toLocaleDateString('en-US', dateFormatOptions));
        }
        return daysOfWeek;
    };

    const handlePrevWeekClick = () => {
        const prevWeekStartDate = new Date(currentWeekStartDate);
        prevWeekStartDate.setDate(currentWeekStartDate.getDate() - 7);
        setCurrentWeekStartDate(prevWeekStartDate);
    };

    const handleNextWeekClick = () => {
        const nextWeekStartDate = new Date(currentWeekStartDate);
        nextWeekStartDate.setDate(currentWeekStartDate.getDate() + 7);
        setCurrentWeekStartDate(nextWeekStartDate);
    };

    const currentWeekDates = getWeekDates(currentWeekStartDate);
    const availableTimeSlots = createTimeSlots();

    return (
        <div className="w-full p-4 border rounded shadow-md">
        <p className="mb-2 text-center">
            <span className="font-semibold">Selected Time & Date:</span> {selectedDate.date} {selectedDate.time?.toLowerCase()}
        </p>
        <div className="flex justify-between mb-4">
            <button onClick={handlePrevWeekClick} className="px-2 py-1 text-white bg-blue-500 rounded">
                Previous Week
            </button>
            <button onClick={handleNextWeekClick} className="px-2 py-1 text-white bg-blue-500 rounded">
                Next Week
            </button>
        </div>
        <div className="grid grid-cols-7">
            {currentWeekDates.map((day, index) => (
                <div key={index} className={`${index === 0 && "border-l"} text-center border border-l-0`}>
                    <p className="p-2">{day}</p>
                    {availableTimeSlots.map((time, timeIndex) => (
                        <div
                            key={timeIndex}
                            className="p-2 border-t cursor-pointer hover:bg-gray-300"
                            onClick={() => setSelectedDate({ date: currentWeekDates[index], time })}
                        >
                            {/* {time.toLowerCase()} */}
                        </div>
                    ))}
                </div>
            ))}
        </div>  
        </div>
    );
};

export default WeekDisplay;
