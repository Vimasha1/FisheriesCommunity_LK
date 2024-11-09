import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Viewcollateral from './Viewcollateral';
import { pdfjs } from 'react-pdf';
import Header from '../../Header';  
import SideNav from '../../SideNav';  
import LoanNav from './LoanNav';  
import Footer from '../../Footer';  

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function Uploadcollateral() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [file, saveFile] = useState("");
  const [allPdf, setAllPdf] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getpdf();
  }, []);

  const getpdf = async () => {
    const result = await axios.get("http://localhost:5005/getFile");
    console.log(result.data.data);
    setAllPdf(result.data.data);
  };

  const submitPdf = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post("http://localhost:5005/uploadFile", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(result);
      if (result.data.status === 200) {
        alert("File uploaded successfully");
        getpdf();
      } else {
        alert("Upload Failed. Please try again");
      }
    } catch (err) {
      console.error("Error Uploading File: " + err.message);
      alert("An error occurred while uploading. Please try again");
    }
  };

  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:5005/file/${pdf}`);
  };

  return (
    <div className="flex">
      {/* Side Navbar */}
      <SideNav />

      {/* Main Content Area */}
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        
        {/* Header */}
        <Header />

        {/* Loan Management Navbar */}
        <LoanNav />

        {/* Upload Section */}
        <div className="p-10 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-8">Upload Collateral Document</h1>

          <form onSubmit={submitPdf} className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transition transform hover:scale-105">
            <div className="relative mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Borrower's Name</label>
              <input
                required
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Document Title</label>
              <input
                required
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select PDF File</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => saveFile(e.target.files[0])}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Upload
            </button>
          </form>

          {/* Collateral Document Details */}
          <div className="mt-10 w-full max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Collateral Document Details</h2>
            {allPdf == null ? (
              <p className="text-center text-gray-600">No documents uploaded yet.</p>
            ) : (
              allPdf.map((data) => (
                <div key={data._id} className="bg-white shadow-md rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-blue-600">Borrower's Name: {data.name}</h3>
                  <h3 className="font-semibold text-blue-600">Title: {data.title}</h3>
                  <button
                    onClick={() => showPdf(data.pdf)}
                    className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
                  >
                    Show Document
                  </button>
                </div>
              ))
            )}
          </div>

          {/* View Collateral Component */}
          <Viewcollateral pdfFile={pdfFile} />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Uploadcollateral;
