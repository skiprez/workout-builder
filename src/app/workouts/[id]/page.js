'use client';

import { supabase } from '@/lib/supabase';
import { FitnessCenter, RemoveCircleOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default async function WorkoutDetailPage({ params }) {
  const { id } = params;
  
  // Fetch the workout with its exercises
  const { data: workout, error } = await supabase
    .from('workouts')
    .select('*, workout_exercises(*, exercises(*))')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching workout:', error.message);
    return <p>Error loading workout!</p>;
  }

  return (
    <main className="min-h-screen bg-gray-800 text-white p-6">
      {/* Workout Title */}
      <h1 className="text-3xl font-bold mb-6">{workout.name}</h1>
      
      {/* Exercises List */}
      <h2 className="text-xl font-semibold mb-4">Exercises</h2>
      <div className="space-y-6">
        {workout.workout_exercises.map((we) => (
          <div
            key={we.id}
            className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="flex items-center">
              <FitnessCenter className="mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{we.exercises.name}</h3>
                <p className="text-gray-400">{we.exercises.description}</p>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span className="bg-gray-800 py-1 px-2 rounded">{we.sets} sets</span>
                  <span className="bg-gray-800 py-1 px-2 rounded">{we.reps} reps</span>
                </div>
              </div>
            </div>
            <IconButton className="text-red-500 hover:text-red-700">
              <RemoveCircleOutline />
            </IconButton>
          </div>
        ))}
      </div>
    </main>
  );
}
