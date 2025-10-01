import config from "../config";
import type { SimulationState, ElevatorConfiguration } from '../types/elevatorTypes';

const ELEVATOR_API = config.ELEVATOR_API + '/elevator';

export const elevatorService = {
  async getState(): Promise<SimulationState> {
    const response = await fetch(`${ELEVATOR_API}/state`);
    return await response.json();
  },

  async updateConfiguration(config: ElevatorConfiguration): Promise<SimulationState> {
    const response = await fetch(`${ELEVATOR_API}/configuration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    return await response.json();
  },

  async resetElevators(): Promise<SimulationState> {
    const response = await fetch(`${ELEVATOR_API}/reset`, {
      method: 'POST',
    });
    return await response.json();
  },

  async callElevator(fromFloor: number, toFloor: number): Promise<SimulationState> {
    const response = await fetch(`${ELEVATOR_API}/call`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromFloor, toFloor }),
    });
    return await response.json();
  },

  async generateRandomCalls(numberOfCalls: number): Promise<SimulationState> {
    const response = await fetch(`${ELEVATOR_API}/random-calls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numberOfCalls }),
    });
    return await response.json();
  },

  async processStep(): Promise<SimulationState> {
    const response = await fetch(`${ELEVATOR_API}/step`, {
      method: 'POST',
    });
    return await response.json();
  },
};