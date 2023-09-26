import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { parseISO, format } from 'date-fns';

const MyCalendar = () => {
    const otherEvents = [
        {
            title: 'My title',
            start: '2023-09-26T10:00:00',
            end: '2023-09-26T12:00:00',
        },
        {
            title: 'My title',
            start: '2023-09-26T14:00:00',
            end: '2023-09-26T16:00:00',
        },
        {
            title: 'My title',
            start: '2023-09-24T10:00:00',
            end: '2023-09-24T12:00:00',
        },
    ]
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
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView={'timeGridWeek'}
                headerToolbar={{
                    start: 'title',
                    center: '',
                    end: 'prev,next',
                }}
                height={'180vh'}
                selectable={true}
                // editable={true} // only for new event
                slotDuration={'01:00:00'}
                allDaySlot={false}
                select={handleSelect}
                events={[eventDetails, ...otherEvents]}
                eventBackgroundColor='#E6F6F6'
                eventBorderColor='#09A3A9'
                eventTextColor='#09A3A9'
                eventClassNames={'text-[12px] p-2 text-truncate'}
                displayEventTime={false}
            />
        </div>
    );
};

export default MyCalendar;
