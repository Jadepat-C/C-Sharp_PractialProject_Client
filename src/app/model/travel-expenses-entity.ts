export interface TravelExpensesEntity {
    id: string; //PK id field
    refNumber: string; // Reference number
    titleEn: string; // Title in English
    purposeEn: string; // Purpose in English
    startDate: string; // Start date
    endDate: string; // End date
    airfare: number; // Airfare expenses
    otherTransport: number; // Other transportation expenses
    lodging: number; // Lodging expenses
    meals: number; // Meals expenses
    otherExpenses: number; // Other miscellaneous expenses
    total: number; // Total expenses
}
