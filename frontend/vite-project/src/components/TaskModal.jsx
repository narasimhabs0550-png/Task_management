import React, { useState, useEffect } from 'react';

export default function TaskModal({ open, onClose, onSave, initial }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [status, setStatus] = useState(initial?.status || 'Pending');

  useEffect(() => {
    setTitle(initial?.title || '');
    setDescription(initial?.description || '');
    setStatus(initial?.status || 'Pending');
  }, [initial, open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-xl font-bold mb-4">{initial ? 'Edit Task' : 'Add Task'}</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave({ title, description, status });
          }}
          className="flex flex-col gap-4"
        >
          <input
            className="p-3 rounded bg-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            className="p-3 rounded bg-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <select
            className="p-3 rounded bg-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <div className="flex gap-4 mt-2">
            <button type="submit" className="flex-1 bg-yellow-600 text-white py-2 rounded-lg font-bold hover:bg-yellow-700 transition">
              Save
            </button>
            <button type="button" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-300 transition" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
