export const SOLAR_CONSTANTS = {
    AVG_SUN_HOURS: 4.5, // Nigeria average
    PANEL_WATTAGE: 450,
    BATTERY_VOLTAGE: 12,
    BATTERY_AMP_HOURS: 200,
    CURRENCY_NIGERIA: "₦",
};

export interface AppliancePreset {
    name: string;
    wattage: number;
    hours: number;
}

export const APPLIANCE_PRESETS: AppliancePreset[] = [
    { name: "1HP Air Conditioner", wattage: 800, hours: 6 },
    { name: "1.5HP Air Conditioner", wattage: 1200, hours: 6 },
    { name: "LED Light Bulb (x5)", wattage: 50, hours: 10 },
    { name: "Standing Fan", wattage: 60, hours: 12 },
    { name: "Refrigerator/Freezer", wattage: 200, hours: 24 },
    { name: "Deep Freezer", wattage: 350, hours: 24 },
    { name: "Laptop/Desktop", wattage: 100, hours: 8 },
    { name: "Television (LED)", wattage: 150, hours: 6 },
    { name: "Water Pump (0.5HP)", wattage: 400, hours: 1 },
    { name: "Microwave", wattage: 1200, hours: 0.5 },
];

export const PANEL_OPTIONS = [
    { label: "450W Mono-PERC", value: 450 },
    { label: "550W Half-Cut", value: 550 },
    { label: "600W Bi-Facial", value: 600 },
];

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(value);
};
