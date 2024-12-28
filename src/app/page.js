import { Button } from '@mui/material';
import { FitnessCenter } from '@mui/icons-material';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-[1000px] text-white">
      {/* Title */}
      <h1 className="font-bold text-5xl text-center mb-6">
        Welcome to Workout Builder
      </h1>

      {/* Description */}
      <p className="text-center mb-8 px-6 text-lg max-w-2xl text-gray-300">
        Build, track, and manage your workouts with ease. Customize your exercises and routines to meet your fitness goals!
      </p>

      {/* Start Button with Icon */}
      <Button
        href="/builder"
        variant="contained"
        color="primary"
        className="flex items-center px-6 py-3 text-lg font-semibold rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        <FitnessCenter className="mr-2" />
        Start Building Your Workout
      </Button>
    </main>
  );
}
