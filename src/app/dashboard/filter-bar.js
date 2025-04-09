import React from "react";

export default function FilterBar({ filters, setFilters, searchQuery, setSearchQuery }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-end gap-4">
      <input
        type="text"
        placeholder="Search by title or subject code..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:w-1/3 border p-2 rounded-md shadow-sm"
      />

      <select name="semester" value={filters.semester} onChange={handleChange} className="border p-2 rounded-md">
        <option value="">All Semesters</option>
        <option value="Spring 2025">Spring 2025</option>
        <option value="Fall 2024">Fall 2024</option>
      </select>

      <select name="professor" value={filters.professor} onChange={handleChange} className="border p-2 rounded-md">
        <option value="">All Professors</option>
        <option value="Dr. Smith">Dr. Smith</option>
        <option value="Dr. Johnson">Dr. Johnson</option>
        <option value="Dr. Williams">Dr. Williams</option>
      </select>

      <select name="fileType" value={filters.fileType} onChange={handleChange} className="border p-2 rounded-md">
        <option value="">All Types</option>
        <option value="pdf">PDF</option>
        <option value="docx">DOCX</option>
      </select>
    </div>
  );
}
