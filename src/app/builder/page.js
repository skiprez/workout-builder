'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button, TextField, IconButton } from '@mui/material';
import { AddCircleOutline, FitnessCenter, RemoveCircleOutline } from '@mui/icons-material';

export default function WorkoutBuilderPage() {
  const [workoutName, setWorkoutName] = useState('');
  const [workout, setWorkout] = useState([]);
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    const { data, error } = await supabase.from('exercises').select('*');
    if (error) console.error(error);
    else setExercises(data);
  };

  const saveWorkout = async () => {
    const { data: workoutData, error: workoutError } = await supabase
      .from('workouts')
      .insert({ name: workoutName })
      .select();

    if (workoutError) {
      console.error('Error saving workout:', workoutError.message);
      return;
    }

    const workoutId = workoutData[0].id;

    const workoutExercises = workout.map((exercise) => ({
      workout_id: workoutId,
      exercise_id: exercise.id,
      sets: exercise.sets,
      reps: exercise.reps,
      rest_time: exercise.rest_time,
    }));

    const { error: exercisesError } = await supabase
      .from('workout_exercises')
      .insert(workoutExercises);

    if (exercisesError) {
      console.error('Error saving exercises:', exercisesError.message);
    } else {
      alert('Workout saved successfully!');
      setWorkoutName('');
      setWorkout([]);
    }
  };

  const removeExercise = (id) => {
    setWorkout(workout.filter((exercise) => exercise.id !== id));
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <main className="bg-gray-800 text-white p-6">
      {/* Workout Name Input */}
      <TextField
        label="Workout Name"
        variant="outlined"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        className="bg-gray-900 text-white mb-6 rounded-md"
        fullWidth
      />

      {/* Available Exercises */}
      <h2 className="text-xl font-semibold mb-4">Available Exercises</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => setWorkout([...workout, { ...exercise, sets: 3, reps: 10, rest_time: 60 }])}
          >
            <div className="flex items-center mb-4">
              <FitnessCenter className="mr-2" />
              <h3 className="font-semibold">{exercise.name}</h3>
            </div>
            <p className="text-gray-400">{exercise.description}</p>
          </div>
        ))}
      </div>

      {/* Selected Exercises */}
      <h2 className="text-xl font-semibold mb-4">Selected Exercises</h2>
      <div className="space-y-4">
        {workout.map((exercise, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="flex items-center">
              <FitnessCenter className="mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{exercise.name}</h3>
                <div className="flex gap-2 text-sm text-gray-400">
                  <span className="bg-gray-800 py-1 px-2 rounded">{exercise.sets} sets</span>
                  <span className="bg-gray-800 py-1 px-2 rounded">{exercise.reps} reps</span>
                  <span className="bg-gray-800 py-1 px-2 rounded">{exercise.rest_time}s rest</span>
                </div>
              </div>
            </div>
            <IconButton onClick={() => removeExercise(exercise.id)} className="text-red-500 hover:text-red-700">
              <RemoveCircleOutline />
            </IconButton>
          </div>
        ))}
      </div>

      {/* Save Workout Button */}
      <Button
        onClick={saveWorkout}
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        className="w-60 mt-6"
      >
        Save Workout
      </Button>
    </main>
  );
}
