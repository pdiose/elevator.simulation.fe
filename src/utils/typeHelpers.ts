export const toBool = (val: string | undefined) => val?.toLowerCase() === "true";
export const toNum = (val: string | undefined) => Number(val ?? 0);