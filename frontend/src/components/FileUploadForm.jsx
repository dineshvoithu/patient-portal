import React, { useState } from "react";
import { uploadFile } from "../api/fileService";

function FileUploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      await uploadFile(file);
      setMessage("✅ File uploaded successfully!");
      setFile(null);
      onUpload();
    } catch (err) {
      setMessage("❌ Upload failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-4 mb-4"
    >
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="file-input file-input-bordered file-input-sm w-full sm:w-auto"
      />
      <button
        type="submit"
        className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow disabled:opacity-50`}
        disabled={!file}
      >
        Upload
      </button>
      {message && <p className="text-sm text-gray-700 sm:ml-4">{message}</p>}
    </form>
  );
}

export default FileUploadForm;
