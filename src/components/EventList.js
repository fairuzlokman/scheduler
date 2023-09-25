import React from 'react'

const EventList = ({ events }) => {
    return (
        <ul>
            {events.map((event, index) => (
                <li key={index} className="mb-2">
                    {event}
                </li>
            ))}
        </ul>
    )
}

export default EventList