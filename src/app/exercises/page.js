'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button, TextField, IconButton } from '@mui/material';
import { AddCircleOutline, AccessTime, Category } from '@mui/icons-material';

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState({ name: '', category: '', description: '', duration: 0 });

  const fetchExercises = async () => {
    const { data, error } = await supabase.from('exercises').select('*');
    if (error) console.error(error);
    else setExercises(data);
  };

  const createExercise = async () => {
    const { error } = await supabase.from('exercises').insert(newExercise);
    if (error) console.error(error);
    else {
      setNewExercise({ name: '', category: '', description: '', duration: 0 });
      fetchExercises();
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <main className=" bg-gray-800 text-white p-6 rounded-md">
      {/* Title */}
      <div className="text-3xl font-bold mb-6">Exercises</div>

      {/* Form to Add New Exercise */}
      <form
        className="flex flex-col gap-6 mb-6 bg-gray-700 p-6 rounded-lg shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          createExercise();
        }}
      >
        <TextField
          label="Exercise Name"
          variant="outlined"
          value={newExercise.name}
          onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
          className="bg-gray-900 text-white rounded-md"
          fullWidth
          sx={{
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputBase-input': { color: 'white' },
          }}
        />
        <TextField
          label="Category"
          variant="outlined"
          value={newExercise.category}
          onChange={(e) => setNewExercise({ ...newExercise, category: e.target.value })}
          className="bg-gray-900 text-white rounded-md"
          fullWidth
          sx={{
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputBase-input': { color: 'white' },
          }}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={newExercise.description}
          onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
          className="bg-gray-900 text-white rounded-md"
          fullWidth
          multiline
          rows={3}
          sx={{
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputBase-input': { color: 'white' },
          }}
        />
        <TextField
          label="Duration (seconds)"
          variant="outlined"
          value={newExercise.duration}
          onChange={(e) => setNewExercise({ ...newExercise, duration: Number(e.target.value) })}
          className="bg-gray-900 text-white rounded-md"
          fullWidth
          sx={{
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputBase-input': { color: 'white' },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutline />}
          className="mt-4 w-60"
        >
          Add Exercise
        </Button>
      </form>

      {/* Exercises List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-xl font-semibold">{exercise.name}</div>
            <div className="text-sm text-gray-400">{exercise.description}</div>
            <div className="mt-2 flex items-center text-gray-500">
              <IconButton size="small" color="inherit">
                <Category />
              </IconButton>
              <span>{exercise.category}</span>
            </div>
            <div className="mt-2 flex items-center text-gray-500">
              <IconButton size="small" color="inherit">
                <AccessTime />
              </IconButton>
              <span>{exercise.duration} seconds</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
