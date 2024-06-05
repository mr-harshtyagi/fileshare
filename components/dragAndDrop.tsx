// components/DragAndDrop.js

import React, { useState } from "react";

const DragAndDrop = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (selectedFile) {
      // Handle file upload here
      console.log("Uploading file:", selectedFile);

      await uploadFile(selectedFile);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div
          className="w-80 h-48 border-2 border-dashed border-gray-400 rounded-md flex justify-center items-center text-center p-4"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            //@ts-ignore
            <p>{selectedFile.name}</p>
          ) : (
            <p>Drag & drop a file here, or click to select one</p>
          )}
          <input type="file" className="hidden" onChange={handleFileChange} />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default DragAndDrop;

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/apillion/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    const data = await response.json();
    console.log("File uploaded successfully:", data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};