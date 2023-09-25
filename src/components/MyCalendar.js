import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { parseISO, format } from 'date-fns';

const MyCalendar = () => {
    const [eventDetails, setEventDetails] = useState({
        title: '+ New interview',
        start: '',
        end: '',
    })
    const [eventTime, setEventTime] = useState({
        date: '',
        start: '',
        end: '',
    })

    const handleSelect = (info) => {
        setEventTime({
            date: info.startStr.split('T')[0],
            start: format(parseISO(info.startStr), 'HH:mm'),
            end: format(parseISO(info.endStr), 'HH:mm'),
        })
        setEventDetails(details => ({
            title: details.title,
            start: info.startStr,
            end: info.endStr,
        }))
    }
    
    const handleTimeUpdate = () => {
        setEventDetails(details => ({
            title: details.title,
            start: `${eventTime.date}T${eventTime.start}`,
            end: `${eventTime.date}T${eventTime.end}`
        }))
    }

    useEffect(() => {
        handleTimeUpdate()
    }, [eventTime.start, eventTime.end])
    
    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            const time = `${formattedHour}:${formattedMinute}`;
            timeOptions.push(time);
        }
    }
    
    return (
        <div>
             <label>
                Start Time:
                <select
                    defaultValue={eventTime.start}
                    value={eventTime.start}
                    onChange={(e) => setEventTime(prevTime => ({date: prevTime.date, start: e.target.value, end: prevTime.end}))}
                >
                    {timeOptions.map((timeOption) => (
                        <option key={timeOption} value={timeOption}>
                            {timeOption}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                End Time:
                <select
                    defaultValue={eventTime.end}
                    value={eventTime.end}
                    onChange={(e) => setEventTime(prevTime => ({date: prevTime.date, start: prevTime.start, end: e.target.value}))}
                >
                    {timeOptions.map((timeOption) => (
                        <option key={timeOption} value={timeOption}>
                            {timeOption}
                        </option>
                    ))}
                </select>
            </label>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                initialView={'timeGridWeek'}
                headerToolbar={{
                    start: 'title',
                    center: '',
                    end: 'prev,next',
                }}
                height={'90vh'}
                selectable={true}
                // editable={true} // only for new event
                slotDuration={'00:30:00'}
                allDaySlot={false}
                select={handleSelect}
                events={[eventDetails]}
            />
        </div>
    );
};

export default MyCalendar;
