import React from 'react';

export default function TaskCard({ task, onEdit, onDelete }) {
  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
  };
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 hover:scale-[1.02] hover:shadow-lg transition cursor-pointer group">
      <div className="flex justify-between items-start gap-2">
        <div>
          <div className="font-bold text-lg mb-1">{task.title}</div>
          <div className="text-gray-500 text-sm mb-2">{task.description}</div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold h-fit ${statusColors[task.status] || 'bg-gray-100 text-gray-800'}`}>{task.status}</span>
      </div>
      <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition">
        <button onClick={onEdit} className="p-2 rounded hover:bg-blue-100" title="Edit">
          <span role="img" aria-label="edit">✏️</span>
        </button>
        <button onClick={onDelete} className="p-2 rounded hover:bg-red-100" title="Delete">
          <span role="img" aria-label="delete">🗑️</span>
        </button>
      </div>
    </div>
  );
}
