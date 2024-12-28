'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  AddCircleOutline,
  FitnessCenter,
  RemoveCircleOutline,
  Search,
  FilterList,
  Category,
  BarChart,
} from '@mui/icons-material';

export default function WorkoutBuilderPage() {
  const [workoutName, setWorkoutName] = useState('');
  const [workout, setWorkout] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filterExercises = () => {
    let filtered = exercises;

    if (filterCategory) {
      filtered = filtered.filter((exercise) => exercise.category === filterCategory);
    }

    if (filterDifficulty) {
      filtered = filtered.filter((exercise) => exercise.difficulty === filterDifficulty);
    }

    if (searchQuery) {
      filtered = filtered.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredExercises(filtered);
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    setFilteredExercises(exercises);
  }, [exercises]);

  useEffect(() => {
    filterExercises();
  }, [filterCategory, filterDifficulty, searchQuery]);

  return (
    <main className="bg-gray-800 text-white p-6 rounded-md">
      {/* Workout Name Input */}
      <TextField
        label="Workout Name"
        variant="outlined"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        className="bg-gray-900 text-white mb-6 rounded-md"
        fullWidth
        sx={{
          '& .MuiInputLabel-root': { color: 'white' },
          '& .MuiInputBase-input': { color: 'white' },
        }}
        InputProps={{
          startAdornment: <FitnessCenter sx={{ color: 'white', marginRight: 1 }} />,
        }}
      />

      {/* Save Workout Button */}
      <Button
        onClick={saveWorkout}
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        className="w-60"
        sx={{
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        Save Workout
      </Button>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <FormControl variant="outlined" className="md:w-60 w-full">
          <InputLabel sx={{ color: 'white' }}>
            <Category sx={{ marginRight: 1 }} />
            Category
          </InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            sx={{
              '& .MuiInputBase-input': { color: 'white' },
              '& .MuiSvgIcon-root': { color: 'white' },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Strength">Strength</MenuItem>
            <MenuItem value="Cardio">Cardio</MenuItem>
            <MenuItem value="Core">Core</MenuItem>
            <MenuItem value="Flexibility">Flexibility</MenuItem>
            <MenuItem value="Plyometrics">Plyometrics</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-900 text-white md:w-60 w-full"
          sx={{
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputBase-input': { color: 'white' },
          }}
          InputProps={{
            startAdornment: <Search sx={{ color: 'white', marginRight: 1 }} />,
          }}
        />
      </div>

      {/* Selected Exercises */}
      <h2 className="text-xl font-semibold mb-4"><FitnessCenter sx={{ color: 'white', marginRight: 1 }} />Selected Exercises</h2>
      <div className="space-y-4 mb-4">
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

      {/* Available Exercises */}
      <h2 className="text-xl font-semibold mb-4">
        <FilterList sx={{ marginRight: 1 }} />
        Available Exercises
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredExercises.map((exercise) => (
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
    </main>
  );
}