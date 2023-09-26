import { format } from "date-fns";
import React, { useEffect, useState } from "react";

const TIME_SLOT_HOUR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const DAYS_IN_WEEK = 7;
const TIME_SLOT_HEIGHT = 100;

const WeekDisplay = () => {
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(
        getStartOfWeek()
    );
    const [selectedEvent, setSelectedEvent] = useState({
        date: null,
        start: null,
        end: null,
    });

    function getStartOfWeek() {
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay();
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - dayOfWeek);
        return startOfWeek;
    }

    const getWeekDates = (startOfWeek) => {
        const daysOfWeek = [];
        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            daysOfWeek.push(format(date, "EEE, dd/MM"));
        }
        return daysOfWeek;
    };

    const handlePrevWeekClick = () => {
        const prevWeekStartDate = new Date(currentWeekStartDate);
        prevWeekStartDate.setDate(
            currentWeekStartDate.getDate() - DAYS_IN_WEEK
        );
        setCurrentWeekStartDate(prevWeekStartDate);
    };

    const handleNextWeekClick = () => {
        const nextWeekStartDate = new Date(currentWeekStartDate);
        nextWeekStartDate.setDate(
            currentWeekStartDate.getDate() + DAYS_IN_WEEK
        );
        setCurrentWeekStartDate(nextWeekStartDate);
    };

    const handleSelect = (date, start, duration) => {
        setSelectedEvent({
            date,
            start,
            end: start + duration,
        });
    };

    const calcEventHeight = (start, end) => {
        return (end - start) * TIME_SLOT_HEIGHT;
    };

    const currentWeekDates = getWeekDates(currentWeekStartDate);

    const events = [
        {
            title: "Interview 1",
            date: format(new Date(), "EEE, dd/MM"),
            start: 3,
            end: 4,
        },
        {
            title: "Interview 2",
            date: format(new Date(), "EEE, dd/MM"),
            start: 5,
            end: 7.5,
        },
    ];

    
    return (
        <div className="w-full p-4 border rounded shadow-md">
            <label>
                Start Time:
                <select
                    defaultValue={selectedEvent.start}
                    value={selectedEvent.start}
                    onChange={(e) => setSelectedEvent(prevTime => ({date: prevTime.date, start: e.target.value, end: prevTime.end}))}
                >
                    {TIME_SLOT_HOUR.map((timeOption) => (
                        <option key={timeOption} value={timeOption}>
                            {timeOption}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                End Time:
                <select
                    defaultValue={selectedEvent.end}
                    value={selectedEvent.end}
                    onChange={(e) => setSelectedEvent(prevTime => ({date: prevTime.date, start: prevTime.start, end: e.target.value}))}
                >
                    {TIME_SLOT_HOUR.map((timeOption) => (
                        <option key={timeOption} value={timeOption}>
                            {timeOption}
                        </option>
                    ))}
                </select>
            </label>            <p className="mb-2 text-center">
                <span className="font-semibold">Selected Time & Date:</span>{" "}
                {selectedEvent?.date}, {selectedEvent?.start} -{" "}
                {selectedEvent?.end}
            </p>
            <div className="flex justify-between mb-4">
                <button
                    onClick={handlePrevWeekClick}
                    className="px-2 py-1 text-white bg-blue-500 rounded"
                >
                    &lt; Previous Week
                </button>
                <button
                    onClick={handleNextWeekClick}
                    className="px-2 py-1 text-white bg-blue-500 rounded"
                >
                    Next Week &gt;
                </button>
            </div>
            <div className="grid grid-cols-7">
                {currentWeekDates.map((date, dateIndex) => (
                    <div
                        key={dateIndex}
                        className={`${
                            dateIndex === 0 ? "border-l" : "border-l-0"
                        } text-center border`}
                    >
                        <p className="p-2">{date}</p>
                        {TIME_SLOT_HOUR.map((_, hourIndex) => (
                            <div className="px-2 border-t" key={hourIndex}>
                                <div
                                    className="relative flex h-16 hover:bg-[#E6F6F6] rounded-[2.5px] hover:border-[1px] hover:border-[#09A3A9]"
                                    onClick={() =>
                                        handleSelect(date, hourIndex, 1)
                                    }
                                >
                                    {/* <div className='hover:bg-[#E6F6F6] rounded-[2.5px] hover:border-[1px] h-full w-full hover:border-[#09A3A9] absolute z-10'>
                                        
                                    </div> */}
                                    {selectedEvent &&
                                        selectedEvent?.date === date &&
                                        selectedEvent?.start === hourIndex && (
                                            <div
                                                style={{
                                                    height: `${calcEventHeight(
                                                        selectedEvent.start,
                                                        selectedEvent.end
                                                    )}%`,
                                                }}
                                                className="relative bg-[#E6F6F6] rounded-[2.5px] w-full border-[1px] border-[#09A3A9] truncate"
                                            >
                                                + New interview
                                            </div>
                                        )}
                                    {events.length > 0 &&
                                        events.map(
                                            (event, eventIndex) =>
                                                event.date === date &&
                                                event.start === hourIndex && (
                                                    <div
                                                        key={eventIndex}
                                                        style={{
                                                            height: `${calcEventHeight(
                                                                event.start,
                                                                event.end
                                                            )}%`,
                                                        }}
                                                        className={`w-full bg-[#F7F9FA] rounded-[2.5px] truncate relative`}
                                                    >
                                                        {event.title}
                                                    </div>
                                                )
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekDisplay;
