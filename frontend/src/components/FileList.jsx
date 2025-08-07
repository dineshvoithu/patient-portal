import React from "react";
import { downloadFile, deleteFile } from "../api/fileService";

function FileList({ files, onDelete }) {
  const handleDownload = async (id, filename) => {
    try {
      const res = await downloadFile(id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFile(id);
      onDelete();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (files.length === 0) {
    return (
      <p className="text-gray-500 mt-4 text-center">
        No documents uploaded yet.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {files.map((file) => (
        <li
          key={file.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 border rounded shadow-sm"
        >
          <div className="mb-2 sm:mb-0">
            <p className="font-medium text-gray-800">{file.filename}</p>
            <p className="text-sm text-gray-500">
              {(file.filesize / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleDownload(file.id, file.filename)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              Download
            </button>
            <button
              onClick={() => handleDelete(file.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FileList;
