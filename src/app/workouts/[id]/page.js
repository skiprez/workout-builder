import { supabase } from '@/lib/supabase';

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
    <main className="p-4">
      <h1 className="text-2xl font-bold">{workout.name}</h1>
      <h2 className="text-lg font-semibold mt-4">Exercises</h2>
      <ul className="mt-2 space-y-4">
        {workout.workout_exercises.map((we) => (
          <li key={we.id} className="border rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold">{we.exercises.name}</h3>
            <p>{we.exercises.description}</p>
            <p className="text-sm text-gray-500">
              {we.sets} sets of {we.reps} reps
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
