import config from "../config";
import { toBool, toNum } from "./typeHelpers";
import type { ElevatorConfiguration } from '../types/elevatorTypes';

/**
 * @returns Environment setting for elevator configuration
 */
export const envElevatorConfig = (): ElevatorConfiguration => {
    return {
        numberOfFloors: toNum(config.NUMBER_FLOORS),
        numberOfElevators: toNum(config.NUMBER_ELEVATORS),
        travelTimePerFloor: toNum(config.TRAVEL_TIME),
        loadingTime: toNum(config.LOADING_TIME),
        randomElevatorStart: toBool(config.RANDOM_ELEVATOR_START),
    };
};