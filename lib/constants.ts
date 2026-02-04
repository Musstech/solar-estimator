export const SOLAR_CONSTANTS = {
    AVG_SUN_HOURS: 4.5, // Peak sun hours default
    EFFICIENCY_LOSS: 1.15, // 15% system loss factor
    BATTERY_DEPTH_OF_DISCHARGE: 0.8, // 80% usable capacity
    NIGHT_USAGE_RATIO: 0.6, // 60% of usage happens at night (conservative)
    COST_PER_KWH: 250, // Naira per kWh (Estimate)
};

export const PANEL_OPTIONS = [
    { label: "Standard (450W)", value: 450 },
    { label: "Premium (550W)", value: 550 },
    // Dynamic: can be extended
];

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(amount);
};
