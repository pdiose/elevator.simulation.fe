import React, { useState, useEffect } from 'react';
import type { SimulationState, ElevatorConfiguration } from '../types/elevatorTypes';
import { elevatorService } from '../services/elevatorService';
import { envElevatorConfig } from '../utils/envHelpers';
import { numInputChange } from '../utils/inputHelpers';

const ElevatorSimulator: React.FC = () => {
    const [state, setState] = useState<SimulationState | null>(null);
    const [config, setConfig] = useState<ElevatorConfiguration>(envElevatorConfig());
    const [manualCall, setManualCall] = useState({ fromFloor: 1, toFloor: 2 });
    const [randomCallsCount, setRandomCallsCount] = useState(5);
    const [autoStep, setAutoStep] = useState(false);

    useEffect(() => {
        loadState();
    }, []);

    useEffect(() => {
        let interval: number;

        if (autoStep && state) {
            interval = setInterval(async () => {
                await processStep();
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [autoStep, state]);

    const loadState = async () => {
        try {
            const newState = await elevatorService.getState();
            setState(newState);
        } catch (error) {
            console.error('Failed to load state:', error);
        }
    };

    const updateConfiguration = async (cfg?: ElevatorConfiguration) => {
        try {
            const newState = await elevatorService.updateConfiguration(cfg ?? config);
            setState(newState);
        } catch (error) {
            console.error('Failed to update configuration:', error);
        }
    };

    const resetElevators = async () => {
        try {
            const cfg = envElevatorConfig();
            setConfig(cfg);
            setManualCall({
                    ...manualCall,
                    fromFloor: numInputChange('1', config.numberOfFloors),
                    toFloor: numInputChange('2', config.numberOfFloors),
                    })
            setRandomCallsCount(numInputChange('5', 50))
            await updateConfiguration(cfg);

        } catch (error) {
            console.error('Failed to reset elevators:', error);
        }
    };

    const callElevator = async () => {
        try {
            const newState = await elevatorService.callElevator(manualCall.fromFloor, manualCall.toFloor);
            setState(newState);
        } catch (error) {
            console.error('Failed to call elevator:', error);
        }
    };

    const generateRandomCalls = async () => {
        try {
            const newState = await elevatorService.generateRandomCalls(randomCallsCount);
            setState(newState);
        } catch (error) {
            console.error('Failed to generate random calls:', error);
        }
    };

    const processStep = async () => {
        try {
            const newState = await elevatorService.processStep();
            setState(newState);
        } catch (error) {
            console.error('Failed to process step:', error);
        }
    };

    if (!state) {
        return <div className="elevator-simulator">Loading...</div>;
    }

    return (
        <div className="elevator-simulator">
            <div className="simulator-header">
                <h1> Elementary School Elevator Simulator </h1>
            </div>

            <div className="configuration-panel">
                <h2> Elevator Configuration</h2>
                <div className="config-grid">
                    <div className="config-item">
                        <label>Number of Floors:</label>
                        <input
                            type="number"
                            min="2"
                            value={config.numberOfFloors}
                            onChange={(e) => setConfig({ ...config, numberOfFloors: numInputChange(e.target.value, 50) })}
                        />
                    </div>
                    <div className="config-item">
                        <label>Number of Elevators:</label>
                        <input
                            type="number"
                            min="1"
                            value={config.numberOfElevators}
                            onChange={(e) => setConfig({ ...config, numberOfElevators: numInputChange(e.target.value, 50) })}
                        />
                    </div>
                    <div className="config-item">
                        <label>Travel Time per Floor (seconds):</label>
                        <input
                            type="number"
                            min="1"
                            value={config.travelTimePerFloor}
                            onChange={(e) => setConfig({ ...config, travelTimePerFloor: numInputChange(e.target.value, 100) })}
                        />
                    </div>
                    <div className="config-item">
                        <label>Loading/Unloading Time (seconds):</label>
                        <input
                            type="number"
                            min="1"
                            value={config.loadingTime}
                            onChange={(e) => setConfig({ ...config, loadingTime: numInputChange(e.target.value, 100) })}
                        />
                    </div>
                    <div className="config-item">
                        <label htmlFor="random-start">Random Elevator Start Floor:</label>
                        <input
                            type="checkbox"
                            checked={config.randomElevatorStart}
                            onChange={(e) => setConfig({ ...config, randomElevatorStart: e.target.checked })}
                        />
                    </div>
                </div>
                <div className="action-buttons">
                    <button onClick={resetElevators}>
                        Reset Elevators
                    </button>
                    <button onClick={() => updateConfiguration()} className="secondary">
                        Apply Configuration
                    </button>
                    <button
                        onClick={() => setAutoStep(!autoStep)}
                        className={autoStep ? 'accent' : ''}
                    >
                        {autoStep ? '⏸ Stop Auto' : '▶ Start Auto'}
                    </button>
                </div>
            </div>

            <div className="manual-calls-row">
                <div className="manual-call-panel">
                    <h2>Manual Elevator Call</h2>
                    <div className="call-inputs">
                        <div className="input-group">
                            <label>From Floor:</label>
                            <input
                                type="number"
                                min="1"
                                max={config.numberOfFloors}
                                value={manualCall.fromFloor}
                                onChange={(e) =>
                                    setManualCall({
                                        ...manualCall,
                                        fromFloor: numInputChange(e.target.value, config.numberOfFloors),
                                    })
                                }
                            />
                        </div>
                        <div className="input-group">
                            <label>To Floor:</label>
                            <input
                                type="number"
                                min="1"
                                max={config.numberOfFloors}
                                value={manualCall.toFloor}
                                onChange={(e) =>
                                    setManualCall({
                                        ...manualCall,
                                        toFloor: numInputChange(e.target.value, config.numberOfFloors),
                                    })
                                }
                            />
                        </div>
                        <button onClick={callElevator} className="secondary">
                            Call Elevator
                        </button>
                    </div>
                </div>

                <div className="manual-call-panel">
                    <h2>Random Calls Generator</h2>
                    <div className="call-inputs">
                        <div className="input-group">
                            <label># of Random Calls:</label>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={randomCallsCount}
                                onChange={(e) => setRandomCallsCount(numInputChange(e.target.value, 50))}
                            />
                        </div>
                        <button onClick={generateRandomCalls} className="accent">
                            Generate Random Calls
                        </button>
                    </div>
                </div>
            </div>

            <div className="simulation-area">
                <div className="calls-panel">
                    <h2> Elevator Calls</h2>
                    <div className="calls-list">
                        {state.calls.slice().reverse().map((call) => (
                            <div key={call.callId} className={`call-item ${call.statusInfo.toLowerCase()}`}>
                                <div className="call-info">
                                    <div>
                                        <span>Call #:</span> {call.callId}
                                    </div>
                                    <div>
                                        <span>Elevator:</span> {call.assignedElevator ? `#${call.assignedElevator}` : 'Waiting'}
                                    </div>
                                    <div>
                                        <span>From:</span> Floor {call.fromFloor}
                                    </div>
                                    <div>
                                        <span>To:</span> Floor {call.toFloor}
                                    </div>
                                </div>
                                <div className={`call-status ${call.statusInfo.toLowerCase()}`}>
                                    {call.statusInfo}
                                </div>
                            </div>
                        ))}
                        {state.calls.length === 0 && (
                            <div>
                                No elevator calls yet
                            </div>
                        )}
                    </div>
                </div>

                <div className="building-view">
                    <h2> School Building Elevators</h2>
                    <div className="elevators-container">
                        {state.elevators.map((elevator) => (
                            <div key={elevator.id} className={`elevator ${elevator.statusInfo.toLowerCase()}`}>
                                <div className="elevator-number">Elevator #{elevator.id}</div>
                                <div className="elevator-floor">Floor</div>
                                <div className="elevator-floor">{elevator.currentFloor}</div>
                                <div className={`elevator-status ${elevator.statusInfo.toLowerCase()}`}>
                                    {elevator.statusInfo}
                                </div>
                                {elevator.timeRemaining !== undefined && elevator.timeRemaining > 0 && (
                                    <div className="elevator-timer">
                                        Time: {elevator.timeRemaining}s
                                    </div>
                                )}
                                <div className="elevator-action">
                                    {elevator.currentAction}
                                </div>
                                {elevator.destinationFloors.length > 0 && (
                                    <div className="destination-floors">
                                        <div className="destinations-title">Destinations:</div>
                                        <div className="destinations-list">
                                            {elevator.destinationFloors.join(', ')}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="floors-display">
                        <h3>Building Floors (1 - {config.numberOfFloors})</h3>
                        <div className="floors-grid">
                            {Array.from({ length: config.numberOfFloors }, (_, i) => i + 1).map(floor => (
                                <div
                                    key={floor}
                                    className={`floor-number ${state.elevators.some(e => e.currentFloor === floor) ? 'current' : ''}`}
                                >
                                    {floor}
                                    {state.elevators.filter(e => e.currentFloor === floor).map(e => (
                                        <div key={e.id} className="elevator-number">
                                            E{e.id}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ElevatorSimulator;