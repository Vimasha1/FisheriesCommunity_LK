import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ id: null, name: '', description: '', date: '', location: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/events');
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/events/${newEvent.id}`, newEvent);
        setIsEditing(false);
      } else {
        await axios.post('/api/events', newEvent);
      }
      setNewEvent({ id: null, name: '', description: '', date: '', location: '', image: '' });
      fetchEvents();
    } catch (err) {
      setError('Failed to save the event');
    }
  };

  const handleEdit = (event) => {
    setNewEvent(event);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`);
      fetchEvents();
    } catch (err) {
      setError('Failed to delete the event');
    }
  };

  return (
    <div className="event-management">
      <h2>Event Management</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" value={newEvent.name} onChange={handleInputChange} placeholder="Event Name" required />
        <input name="description" value={newEvent.description} onChange={handleInputChange} placeholder="Description" required />
        <input name="date" type="date" value={newEvent.date} onChange={handleInputChange} required />
        <input name="location" value={newEvent.location} onChange={handleInputChange} placeholder="Location" required />
        <input name="image" value={newEvent.image} onChange={handleInputChange} placeholder="Image URL" required />
        <button type="submit">{isEditing ? 'Update Event' : 'Add Event'}</button>
      </form>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <ul className="event-list">
          {events.map((event) => (
            <li key={event._id}>
              <span>{event.name} - {new Date(event.date).toLocaleDateString()}</span>
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventManagement;
