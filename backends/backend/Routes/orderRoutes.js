const express = require('express');
const router = express.Router();
const Order = require('../Model/Order');


router.post('/orders', async (req, res) => {
    try {
        const { supplierName, orderDate, items } = req.body;

        const newOrder = new Order({
            supplierName,
            orderDate,
            items
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Server error, could not create order', error });
    }
});


router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders); 
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
});


router.put('/orders/:id', async (req, res) => {
  try {
      const { status, isPaymentDone, paymentValue } = req.body;
      
 
      let updateData = {};
      
      if (status) {
          updateData.status = status; 
      }

      if (isPaymentDone !== undefined) {
          updateData.isPaymentDone = isPaymentDone; 
      }

      if (paymentValue !== undefined) {
          updateData.paymentValue = paymentValue; 
      }

      const order = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!order) {
          return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
      res.status(500).json({ message: 'Error updating order', error });
  }
});


router.get('/orders/:id', async (req, res) => {
    console.log(`Fetching order with ID: ${req.params.id}`);
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ message: 'Error retrieving order', error });
    }
});


router.delete('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId);

        if (order.status !== 'pending') {
            return res.status(400).json({ message: 'Order cannot be deleted unless it is pending.' });
        }

        await order.remove();
        res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete order.' });
    }
});


module.exports = router;
