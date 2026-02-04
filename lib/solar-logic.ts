import { SOLAR_CONSTANTS } from "./constants";

export interface ApplianceLoad {
    id: string;
    name: string;
    wattage: number;
    quantity: number;
    hoursPerDay: number;
}

export interface TechnicalResult {
    totalDailyLoadKWh: number;
    peakLoadWatts: number;
    requiredPanelCapacityKW: number;
    panelCount: number;
    requiredInverterKVA: number;
    batteryBankKWh: number;
    batteryCount: number;
    estimatedCost: {
        min: number;
        max: number;
    };
    savingsPerYear: number;
}

/**
 * Calculates technical solar requirements based on appliance loads
 */
export const calculateTechnicalSizing = (loads: ApplianceLoad[]): TechnicalResult => {
    // 1. Calculate Daily Energy Consumption (kWh)
    const totalDailyLoadWh = loads.reduce(
        (sum, load) => sum + (load.wattage * load.quantity * load.hoursPerDay),
        0
    );
    const dailyKWh = totalDailyLoadWh / 1000;

    // 2. Peak Load (Concurrent Watts)
    const peakWatts = loads.reduce((sum, load) => sum + (load.wattage * load.quantity), 0);

    // 3. Recommended Panel Capacity (Based on avg 4.5 Sun Hours in Nigeria)
    const sunHours = 4.5;
    const requiredPanelKW = (dailyKWh / sunHours) * 1.25; // 25% safety margin
    const panelCount = Math.ceil((requiredPanelKW * 1000) / 450); // Assuming 450W panels

    // 4. Inverter Size (kVA)
    // Formula: (Watts / Power Factor 0.8) / 1000 * Safety Margin
    const requiredInverterKVA = (peakWatts / 0.8) / 1000 * 1.25;

    // 5. Battery Bank (kWh)
    // Assuming 50% Depth of Discharge for longevity and 1 day autonomy
    const batteryKWh = dailyKWh / 0.5;
    // Assuming standard 12V 200Ah (2.4kWh) batteries
    const batteryCount = Math.ceil(batteryKWh / 2.4);

    // 6. Cost Estimation (₦)
    // Hybrid system estimated at ~₦750,000 per kWh of needed daily capacity
    const baseCost = dailyKWh * 750000;

    // 7. Savings (₦)
    // Assuming avg cost of grid + fuel is ₦120 per kWh
    const annualEnergyNeeded = dailyKWh * 365;
    const savingsPerYear = annualEnergyNeeded * 120;

    return {
        totalDailyLoadKWh: parseFloat(dailyKWh.toFixed(2)),
        peakLoadWatts: peakWatts,
        requiredPanelCapacityKW: parseFloat(requiredPanelKW.toFixed(2)),
        panelCount,
        requiredInverterKVA: parseFloat(requiredInverterKVA.toFixed(1)),
        batteryBankKWh: parseFloat(batteryKWh.toFixed(2)),
        batteryCount,
        estimatedCost: {
            min: baseCost * 0.9,
            max: baseCost * 1.15
        },
        savingsPerYear
    };
};

/**
 * Legacy support for bill-based estimates
 */
export const calculateSolarEstimate = (monthlyBill: number) => {
    const kwhPrice = 70; // Avg kWh price
    const monthlyKWh = monthlyBill / kwhPrice;
    const dailyKWh = monthlyKWh / 30;

    // Convert bill to a mock appliance load for processing
    const mockLoad: ApplianceLoad = {
        id: "legacy",
        name: "General Home Load",
        wattage: (dailyKWh * 1000) / 24, // Distributed hourly
        quantity: 1,
        hoursPerDay: 24
    };

    return calculateTechnicalSizing([mockLoad]);
};
