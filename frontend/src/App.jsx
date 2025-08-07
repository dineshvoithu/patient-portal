import React, { useEffect, useState } from "react";
import FileUploadForm from "./components/FileUploadForm";
import FileList from "./components/FileList";
import { getFiles } from "./api/fileService";

function App() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    const res = await getFiles();
    setFiles(res.data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Patient Portal – Document Upload
        </h1>
        <FileUploadForm onUpload={fetchFiles} />
        <hr className="my-6 border-gray-300" />
        <div className="max-h-[400px] overflow-y-auto">
          <FileList files={files} onDelete={fetchFiles} />
        </div>
      </div>
    </div>
  );
}

export default App;
