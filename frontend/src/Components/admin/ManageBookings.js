import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/cards";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { Input } from "../ui/input";

function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("/api/bookings/all");
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "Ticket Quantity",
      "Ticket Type",
      "Special Request",
      "Booking Date",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredBookings.map((booking) =>
        [
          booking.fullName,
          booking.userEmail,
          booking.userPhone,
          booking.ticketQuantity,
          booking.ticketType,
          booking.specialRequest || "N/A",
          format(new Date(booking.createdAt), "PP"),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "bookings.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card className="w-full h-screen max-w-[1220px] mx-auto mt-5 bg-white shadow-lg flex flex-col">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-2xl font-bold text-gray-800">Booking Records</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8 pr-4 py-2 border rounded-md"
            />
          </div>
          <Button onClick={exportToCSV} className="bg-green-500 hover:bg-green-600 text-white">
            <Download className="mr-2 h-4 w-4" /> Export to CSV
          </Button>
        </div>
        <div className="overflow-x-auto flex-grow">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Ticket Quantity</TableHead>
                <TableHead>Ticket Type</TableHead>
                <TableHead>Special Request</TableHead>
                <TableHead>Booking Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell className="font-medium">{booking.fullName}</TableCell>
                  <TableCell>{booking.userEmail}</TableCell>
                  <TableCell>{booking.userPhone}</TableCell>
                  <TableCell>{booking.ticketQuantity}</TableCell>
                  <TableCell>{booking.ticketType}</TableCell>
                  <TableCell>{booking.specialRequest || 'N/A'}</TableCell>
                  <TableCell>{format(new Date(booking.createdAt), 'PP')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span className="text-sm font-medium text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default BookingTable;
