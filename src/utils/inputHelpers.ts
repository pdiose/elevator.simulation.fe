/**
 * Handles change events for number inputs in a configuration object.
 * Ensures the value is a valid integer within the specified range.
 * @param rawValue The raw string value from the input field (e.g., e.target.value).
 * @param maxAllowed The maximum allowed value.
 * @param minAllowed The minimum allowed value (defaulting to 1 to exclude 0 and negatives).
 * @returns A validated integer value clamped within the minAllowed and maxAllowed range.
 */
export const numInputChange = (rawValue: string, maxAllowed: number, minAllowed: number = 1): number => {
    if (rawValue.trim() === '') {
        return minAllowed;
    }

    const numValue = parseInt(rawValue, 10);

    if (isNaN(numValue)) {
        return minAllowed;
    }

    if (numValue < minAllowed) {
        return minAllowed;
    }

    if (numValue > maxAllowed) {
        return maxAllowed;
    }

    return numValue;
};