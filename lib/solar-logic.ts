import { SOLAR_CONSTANTS } from "./constants";

interface CalculatorInputs {
    monthlyBill: number; // in Naira
    sunHours?: number; // defaults to constant
    panelWattage?: number; // defaults to 550W
    isOffGrid?: boolean;
}

export interface CalculationResult {
    dailyEnergyNeed: number; // kWh
    requiredSystemSize: number; // kW
    panelCount: number;
    batteryCapacity: number; // kWh
    estimatedCost: {
        min: number;
        max: number;
    };
}

export const calculateSolarSystem = ({
    monthlyBill,
    sunHours = SOLAR_CONSTANTS.AVG_SUN_HOURS,
    panelWattage = 550,
    isOffGrid = false,
}: CalculatorInputs): CalculationResult => {
    // 1. Calculate Daily Usage (kWh)
    // Bill / Cost per kWh / 30 days
    const dailyEnergyNeed = (monthlyBill / SOLAR_CONSTANTS.COST_PER_KWH) / 30;

    // 2. Required Inverter/System Loading (kW)
    // Formula: (Daily Energy / Sun Hours) * Efficiency Factor
    const requiredSystemSize = (dailyEnergyNeed / sunHours) * SOLAR_CONSTANTS.EFFICIENCY_LOSS;

    // 3. Panel Count
    // (System Size in kW * 1000) / Panel Wattage
    const rawPanelCount = (requiredSystemSize * 1000) / panelWattage;
    const panelCount = Math.ceil(rawPanelCount);

    // 4. Battery Bank (kWh)
    // If Off-Grid: Needs to cover Night Usage + buffer
    // Formula: Daily Need * Night Ratio * Autonomy (1.5 days for offgrid) / Depth of Discharge
    const autonomyDays = isOffGrid ? 1.5 : 1.0;
    const batteryCapacity = (dailyEnergyNeed * SOLAR_CONSTANTS.NIGHT_USAGE_RATIO * autonomyDays) / SOLAR_CONSTANTS.BATTERY_DEPTH_OF_DISCHARGE;

    // 5. Estimated Cost (Rough Market Estimates in Naira)
    // ~800k Naira per kW installed (very rough heuristic)
    const baseCostPerKW = 800000;
    const systemCost = requiredSystemSize * baseCostPerKW;

    return {
        dailyEnergyNeed: Number(dailyEnergyNeed.toFixed(2)),
        requiredSystemSize: Number(requiredSystemSize.toFixed(2)),
        panelCount,
        batteryCapacity: Number(batteryCapacity.toFixed(2)),
        estimatedCost: {
            min: Math.floor(systemCost * 0.9),
            max: Math.ceil(systemCost * 1.1),
        },
    };
};
