import React, { useState } from 'react'
import EventList from './EventList'

const Scheduler = () => {
    const [events, setEvents] = useState([])
    const [newEvent, setNewEvent] = useState("")
    
    const addEvent = () => {
        if (newEvent) {
            setEvents([...events, newEvent])
            setNewEvent("")
        }
    }

    return (
        <div className="max-w-[600px] p-5">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Add an event..."
                    value={newEvent}
                    onChange={(e) => setNewEvent(e.target.value)}
                    className="p-2 border rounded w-80"
                />
                <button onClick={addEvent} className="px-4 py-2 ml-2 text-white bg-blue-500 rounded">
                    Add
                </button>
            </div>
            <EventList events={events} />
        </div>
    )
}

export default Scheduler