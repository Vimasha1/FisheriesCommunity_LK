import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/cards";
import { Users, Ticket, Calendar, MapPin, BarChart, PieChart } from 'lucide-react';
function Dashboard() {
  const [bookingsData, setBookingsData] = useState([]);
  const [ticketsData, setTicketsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const bookingsResponse = await axios.get('/api/bookings/all');
      const ticketsResponse = await axios.get('/api/tickets/getTickets');
      setBookingsData(bookingsResponse.data);
      setTicketsData(ticketsResponse.data.tickets);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const getBookingsByDate = () => {
    const bookingsByDate = bookingsData.reduce((acc, booking) => {
      const date = format(new Date(booking.createdAt), 'yyyy-MM-dd');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(bookingsByDate).map(([date, count]) => ({ date, count }));
  };

  const getTicketsByLocation = () => {
    return ticketsData.reduce((acc, ticket) => {
      acc[ticket.location] = (acc[ticket.location] || 0) + 1;
      return acc;
    }, {});
  };

  const ticketLocationData = Object.entries(getTicketsByLocation());

  return (
    <div className=" h-screen p-6 space-y-6 bg-gray-100 w-full max-w-[1220px] mx-auto bg-white m-5 shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookingsData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ticketsData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Event</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ticketsData.length > 0
                ? format(new Date(Math.min(...ticketsData.map(t => new Date(t.date)))), 'MMM d, yyyy')
                : 'No upcoming events'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popular Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ticketLocationData.length > 0
                ? ticketLocationData.reduce((a, b) => a[1] > b[1] ? a : b)[0]
                : 'N/A'}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              Bookings Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getBookingsByDate().slice(-5).map(({ date, count }) => (
                <div key={date} className="flex items-center">
                  <div className="w-24 text-sm">{date}</div>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${(count / Math.max(...getBookingsByDate().map(b => b.count))) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-8 text-right text-sm">{count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-4 w-4 mr-2" />
              Tickets by Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ticketLocationData.map(([location, count]) => (
                <div key={location} className="flex items-center">
                  <div className="w-24 text-sm truncate">{location}</div>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${(count / Math.max(...ticketLocationData.map(t => t[1]))) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-8 text-right text-sm">{count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
