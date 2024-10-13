const Ticket = require('../Model/ticket');
const nodemailer = require('nodemailer');

const createTicket = async (req, res) => {
    try {
        const { image, title, date, location } = req.body;
        const newTicket = new Ticket({
            image,
            title,
            date,
            location,
        });
        await newTicket.save();
        res.status(201).json({ message: 'Event created successfully', ticket: newTicket });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
    }
}

const getTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ticket', error });
    }
}

const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json({ tickets });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error });
    }
}

const updateTicket = async (req, res) => {
    try {
        const { image, title, date, location } = req.body;
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { image, title, date, location },
            { new: true }
        );
        if (!updatedTicket) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated successfully', ticket: updatedTicket });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
}

const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
}
const sendEmail =async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    try {
      // Create a transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'shavithu14@gmail.com', // Replace with your Gmail
          pass: 'ctls ryuc svcm lnfd',  // Replace with your Gmail app password
        },
      });
  
      // Set up email data
      const mailOptions = {
        from: 'shavithu14@gmail.com',
        to: email,
        subject: 'Notification: Event Update',
        text: 'You have subscribed to event notifications. Stay tuned for updates! https://forms.office.com/Pages/ResponsePage.aspx?id=lM_jRMkZMk6WwxT1vwE5GgkHHQC_ZTRPpSlNMGBd1ctURUVXUEpNVjFLQ1dBWE5QSkc0VkZNQ1FNOC4u',
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email' });
    }
  }

  const sendEmailToManager = async (req, res) => {
    const { totalAmount, description } = req.body;

    if (!totalAmount || !description) {
        return res.status(400).json({ message: 'Total amount and description are required' });
    }

    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shavithu14@gmail.com', // Replace with your Gmail
                pass: 'ctls ryuc svcm lnfd',  // Replace with your Gmail app password
            },
        });

        // Set up email data
        const mailOptions = {
            from: 'shavithu14@gmail.com',
            to: 'managerfinancial300@gmail.com', // Email to the manager
            subject: 'Event Financial Information',
            text: `Dear Manager,\n\nHere are the details of the event:\n\nTotal Amount: ${totalAmount}\nDescription: ${description}\n\nThank you.`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully to managerfinancial300@gmail.com' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email to manager' });
    }
};


module.exports = {
    createTicket,
    getTicket,
    getTickets,
    updateTicket,
    deleteTicket,
    sendEmail,
    sendEmailToManager
}