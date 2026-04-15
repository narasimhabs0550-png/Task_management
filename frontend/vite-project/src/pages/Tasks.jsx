
import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import Spinner from '../components/Spinner';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [error, setError] = useState('');

  // Fetch tasks from backend
  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load tasks');
        setLoading(false);
      });
  }, []);

  const handleAdd = () => {
    setEditIdx(null);
    setModalOpen(true);
  };
  const handleEdit = idx => {
    setEditIdx(idx);
    setModalOpen(true);
  };
  const handleDelete = async idx => {
    const task = tasks[idx];
    try {
      await deleteTask(task.id);
      setTasks(ts => ts.filter((_, i) => i !== idx));
    } catch (err) {
      setError('Failed to delete task');
    }
  };
  const handleSave = async task => {
    try {
      if (editIdx !== null) {
        // Update
        const id = tasks[editIdx].id;
        const updated = await updateTask(id, task);
        setTasks(ts => ts.map((t, i) => (i === editIdx ? updated : t)));
      } else {
        // Create
        const created = await createTask(task);
        setTasks(ts => [...ts, created]);
      }
      setModalOpen(false);
    } catch (err) {
      setError('Failed to save task');
    }
  };

  return (
    <div className="p-8 w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
        <button
          onClick={handleAdd}
          className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-yellow-700 transition"
        >
          + Add Task
        </button>
      </div>

      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

      {loading ? (
        <Spinner />
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <span className="text-6xl mb-4">📭</span>
          <div className="text-xl font-semibold">No tasks yet</div>
          <div className="text-gray-500 mt-2">Click "Add Task" to create your first task.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.map((task, idx) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => handleEdit(idx)}
              onDelete={() => handleDelete(idx)}
            />
          ))}
        </div>
      )}

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editIdx !== null ? tasks[editIdx] : null}
      />
    </div>
  );
}
