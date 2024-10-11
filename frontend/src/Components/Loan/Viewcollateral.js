import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function Viewcollateral(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1); 
  }

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6 max-w-4xl mx-auto">
      {props.pdfFile ? (
        <>
          <Document 
            file={props.pdfFile} 
            onLoadSuccess={onDocumentLoadSuccess} 
            className="mb-6"
          >
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={false} 
              renderAnnotationLayer={false} 
              className="border shadow-md rounded-lg"
            />
          </Document>
          <div className="flex justify-between items-center mt-4">
            <button 
              onClick={previousPage} 
              disabled={pageNumber <= 1}
              className={`px-4 py-2 rounded-lg bg-blue-500 text-white ${pageNumber <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'} transition`}
            >
              Previous
            </button>
            <p className="text-gray-700 text-lg">
              Page {pageNumber} of {numPages}
            </p>
            <button 
              onClick={nextPage} 
              disabled={pageNumber >= numPages}
              className={`px-4 py-2 rounded-lg bg-blue-500 text-white ${pageNumber >= numPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'} transition`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-red-500 text-lg">Collateral Document Not Available</p>
      )}
    </div>
  );
}

export default Viewcollateral;
