const config = {
  ELEVATOR_API: import.meta.env.VITE_ELEVATOR_API ?? "https://localhost:44314/api",
  NUMBER_FLOORS: import.meta.env.VITE_NUMBER_FLOORS ?? 10,
  NUMBER_ELEVATORS: import.meta.env.VITE_NUMBER_ELEVATORS ?? 4,
  TRAVEL_TIME: import.meta.env.VITE_TRAVEL_TIME ?? 10,
  LOADING_TIME: import.meta.env.VITE_LOADING_TIME ?? 10,
  RANDOM_ELEVATOR_START: import.meta.env.VITE_RANDOM_ELEVATOR_START ?? false
};

export default config;