import { supabase } from '@/lib/supabase';

export default async function WorkoutsPage() {
  // Fetch workouts from the database
  const { data: workouts, error } = await supabase.from('workouts').select('*');

  // Handle loading and error states
  if (error) {
    console.error('Error fetching workouts:', error.message);
    return (
      <main className="p-4">
        <h1 className="text-2xl font-bold text-red-500">Error loading workouts!</h1>
        <p className="text-gray-400 mt-2">Please try again later.</p>
      </main>
    );
  }

  if (!workouts || workouts.length === 0) {
    return (
      <main className="p-4">
        <h1 className="text-2xl font-bold text-white">Workouts</h1>
        <p className="text-gray-400 mt-4">No workouts found. Add some workouts to get started.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-white">Workouts</h1>
      <ul className="mt-6 grid grid-cols-6 gap-[180px]">
        {workouts.map((workout) => (
          <li key={workout.id} className="rounded-lg p-4 bg-gray-800 shadow-md hover:shadow-lg transition-shadow w-60">
            <a href={`/workouts/${workout.id}`} className="text-gray-300 text-lg font-semibold">
              {workout.name}
            </a>
            <p className="text-sm text-gray-500 mt-2">{workout.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
