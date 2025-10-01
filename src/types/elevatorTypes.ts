export interface ElevatorConfiguration {
  numberOfFloors: number;
  numberOfElevators: number;
  travelTimePerFloor: number;
  loadingTime: number;
  randomElevatorStart: boolean;
}

export interface Elevator {
  id: number;
  currentFloor: number;
  status: number;
  statusInfo: string;
  destinationFloors: number[];
  currentPassengerCount?: number;
  timeRemaining?: number;
  currentAction?: string;
}

export interface ElevatorCall {
  callId: number;
  fromFloor: number;
  toFloor: number;
  callTime: string;
  status: number;
  statusInfo: string;
  assignedElevator?: number;
}

export interface SimulationState {
  elevators: Elevator[];
  calls: ElevatorCall[];
  configuration: ElevatorConfiguration;
}