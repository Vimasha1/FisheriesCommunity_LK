import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/cards";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Alert, AlertDescription } from "../ui/alert";

function ManageTicket() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    image: "",
    title: "",
    date: "",
    location: "",
  });
  const [editTicket, setEditTicket] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Changed to 4 items per page

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredTickets(tickets.slice(startIndex, endIndex));
  }, [tickets, currentPage, itemsPerPage]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`/api/tickets/getTickets`);
      setTickets(response.data.tickets);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
      showAlert("Failed to fetch tickets. Please try again.");
    }
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < tickets.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const addTicket = async () => {
    try {
      const response = await axios.post("/api/tickets/add-ticket", newTicket);
      setTickets([...tickets, response.data.ticket]);
      setNewTicket({ image: "", title: "", date: "", location: "" });
      setIsAddDialogOpen(false);
      showAlert("Ticket added successfully!");
    } catch (error) {
      console.error("Failed to add ticket", error);
      showAlert("Failed to add ticket. Please try again.");
    }
  };

  const updateTicket = async () => {
    try {
      const response = await axios.put(
        `/api/tickets/tickets/${editTicket._id}`,
        editTicket
      );
      setTickets(
        tickets.map((ticket) =>
          ticket._id === editTicket._id ? response.data.ticket : ticket
        )
      );
      setEditTicket(null);
      setIsEditDialogOpen(false);
      showAlert("Ticket updated successfully!");
    } catch (error) {
      console.error("Failed to update ticket", error);
      showAlert("Failed to update ticket. Please try again.");
    }
  };

  const deleteTicket = async (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await axios.delete(`/api/tickets/tickets/${id}`);
        setTickets(tickets.filter((ticket) => ticket._id !== id));
        showAlert("Ticket deleted successfully!");
      } catch (error) {
        console.error("Failed to delete ticket", error);
        showAlert("Failed to delete ticket. Please try again.");
      }
    }
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 3000);
  };

  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  return (
    <Card className="w-full max-w-[1220px] h-screen mx-auto bg-white m-5 shadow-lg">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-2xl font-bold text-gray-800">Manage Tickets</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {alertMessage && (
          <Alert className="mb-4">
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Tickets List</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="mr-2 h-4 w-4" /> Add New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Ticket</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Image URL"
                  value={newTicket.image}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, image: e.target.value })
                  }
                />
                <Input
                  placeholder="Title"
                  value={newTicket.title}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, title: e.target.value })
                  }
                />
                <Input
                  type="date"
                  value={newTicket.date}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, date: e.target.value })
                  }
                />
                <Input
                  placeholder="Location"
                  value={newTicket.location}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, location: e.target.value })
                  }
                />
                <Button onClick={addTicket} className="bg-green-500 hover:bg-green-600 text-white">Add Ticket</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/5">Image</TableHead>
                <TableHead className="w-1/5">Title</TableHead>
                <TableHead className="w-1/5">Date</TableHead>
                <TableHead className="w-1/5">Location</TableHead>
                <TableHead className="w-1/5">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket._id}>
                  <TableCell>
                    <img
                      src={ticket.image}
                      alt={ticket.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{ticket.title}</TableCell>
                  <TableCell>{format(new Date(ticket.date), "PP")}</TableCell>
                  <TableCell>{ticket.location}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditTicket(ticket);
                          setIsEditDialogOpen(true);
                        }}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteTicket(ticket._id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

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

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Ticket</DialogTitle>
            </DialogHeader>
            {editTicket && (
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Image URL"
                  value={editTicket.image}
                  onChange={(e) =>
                    setEditTicket({ ...editTicket, image: e.target.value })
                  }
                />
                <Input
                  placeholder="Title"
                  value={editTicket.title}
                  onChange={(e) =>
                    setEditTicket({ ...editTicket, title: e.target.value })
                  }
                />
                <Input
                  type="date"
                  value={format(new Date(editTicket.date), "yyyy-MM-dd")}
                  onChange={(e) =>
                    setEditTicket({ ...editTicket, date: e.target.value })
                  }
                />
                <Input
                  placeholder="Location"
                  value={editTicket.location}
                  onChange={(e) =>
                    setEditTicket({ ...editTicket, location: e.target.value })
                  }
                />
                <Button onClick={updateTicket} className="bg-blue-500 hover:bg-blue-600 text-white">Save Changes</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default ManageTicket;