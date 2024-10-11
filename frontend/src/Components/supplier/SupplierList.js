import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import Header from "../../Header";
import SideNav from "../../SideNav";
import SupplierNav from "./SupplierNav";
import Footer from "../../Footer";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("all");
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    companyName: "",
    itemCategory: "",
    deliveryType: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Fetch suppliers from the backend
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/suppliers");
      setSuppliers(response.data.suppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      message.error("Failed to fetch suppliers. Please try again.");
    }
  };

  // Handle input change for edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle edit supplier
  const handleEditSupplier = (supplier) => {
    setIsEditing(true);
    setFormData({
      _id: supplier._id,
      name: supplier.name,
      companyName: supplier.companyName,
      itemCategory: supplier.itemCategory,
      deliveryType: supplier.deliveryType,
      email: supplier.contactInfo.email,
      phone: supplier.contactInfo.phone,
      address: supplier.address,
    });
  };

  // Handle save after editing
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5005/api/suppliers/${formData._id}`, {
        name: formData.name,
        companyName: formData.companyName,
        itemCategory: formData.itemCategory,
        deliveryType: formData.deliveryType,
        contactInfo: {
          email: formData.email,
          phone: formData.phone,
        },
        address: formData.address,
      });

      setIsEditing(false);
      fetchSuppliers(); // Refresh the supplier list
      message.success("Supplier updated successfully.");
    } catch (error) {
      console.error("Error updating supplier:", error);
      message.error("Failed to update supplier. Please try again.");
    }
  };

  // Handle delete supplier
  const handleDeleteSupplier = async (supplierId) => {
    try {
      await axios.delete(`http://localhost:5005/api/suppliers/${supplierId}`);
      setSuppliers((prevSuppliers) =>
        prevSuppliers.filter((supplier) => supplier._id !== supplierId)
      );
      message.success("Supplier deleted successfully.");
    } catch (error) {
      console.error("Error deleting supplier:", error);
      message.error("Failed to delete supplier. Please try again.");
    }
  };

  // Filter suppliers based on search term and sort
  const filteredSuppliers = suppliers
    .filter((supplier) => {
      if (searchTerm === "") return true;
      return supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((supplier) => {
      if (sortType === "all") return true;
      return supplier.deliveryType === sortType;
    });

  // Generate PDF using jsPDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Supplier List - Fisheries Community", 10, 10);
    doc.autoTable({
      head: [["Name", "Company Name", "Item Category", "Delivery Type", "Email", "Phone", "Address"]],
      body: filteredSuppliers.map(supplier => [
        supplier.name,
        supplier.companyName,
        supplier.itemCategory,
        supplier.deliveryType,
        supplier.contactInfo.email,
        supplier.contactInfo.phone,
        supplier.address
      ])
    });
    doc.save("SupplierList.pdf");
  };

  return (
    <div className="flex">
      <SideNav /> {/* Side Navigation */}

      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-white">
        <Header /> {/* Header Component */}
        <SupplierNav /> {/* Supplier Navigation */}

        {/* Supplier List Section */}
        <section className="p-8 max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-6">
            Supplier Management
          </h1>

          {/* Search and Sort */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded-lg w-1/3"
            />
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="border p-2 rounded-lg"
            >
              <option value="all">All</option>
              <option value="Delivery by Supplier">Delivery by Supplier</option>
              <option value="Pickup by Us">Pickup by Us</option>
            </select>
            <button
              onClick={generatePDF}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Generate Report (PDF)
            </button>
          </div>

          {/* Display Supplier List */}
          {filteredSuppliers.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-gray-600">No suppliers found.</p>
            </div>
          ) : (
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-gray-300 text-gray-700 text-left">
                  <th className="py-3 px-4 font-semibold uppercase">Name</th>
                  <th className="py-3 px-4 font-semibold uppercase">
                    Company Name
                  </th>
                  <th className="py-3 px-4 font-semibold uppercase">
                  Type of Fish Offered
                  </th>
                  <th className="py-3 px-4 font-semibold uppercase">
                    Delivery Type
                  </th>
                  <th className="py-3 px-4 font-semibold uppercase">Email</th>
                  <th className="py-3 px-4 font-semibold uppercase">Phone</th>
                  <th className="py-3 px-4 font-semibold uppercase">Address</th>
                  <th className="py-3 px-4 font-semibold uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier, index) => (
                  <tr
                    key={supplier._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition duration-200`}
                  >
                    <td className="py-4 px-4">{supplier.name}</td>
                    <td className="py-4 px-4">{supplier.companyName}</td>
                    <td className="py-4 px-4">{supplier.itemCategory}</td>
                    <td className="py-4 px-4">{supplier.deliveryType}</td>
                    <td className="py-4 px-4">{supplier.contactInfo.email}</td>
                    <td className="py-4 px-4">{supplier.contactInfo.phone}</td>
                    <td className="py-4 px-4">{supplier.address}</td>
                    <td className="py-4 px-4 flex space-x-2">
                      <button
                        onClick={() => handleEditSupplier(supplier)}
                        className="bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 shadow-md transition duration-200"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteSupplier(supplier._id)}
                        className="bg-red-600 text-white px-3 py-2 rounded-full hover:bg-red-700 shadow-md transition duration-200"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Edit Supplier Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg z-50 mt-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Edit Supplier
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </label>
                  <label className="block">
                    Company Name:
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    Item Category:
                    <input
                      type="text"
                      name="itemCategory"
                      value={formData.itemCategory}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </label>
                  <label className="block">
                    Delivery Type:
                    <select
                      name="deliveryType"
                      value={formData.deliveryType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="Delivery by Supplier">
                        Delivery by Supplier
                      </option>
                      <option value="Pickup by Us">Pickup by Us</option>
                    </select>
                  </label>
                </div>
                <label className="block">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </label>
                <label className="block">
                  Phone:
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </label>
                <label className="block">
                  Address:
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </label>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer /> {/* Footer Component */}
      </div>
    </div>
  );
};

export default SupplierList;
