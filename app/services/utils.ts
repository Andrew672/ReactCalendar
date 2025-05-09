export const daysOfWeek = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
];

export const monthNames = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
];

export const generateDaysInYear = (year: number) => {
    const days: { month: number; day: number }[] = [];
    const startDayOfWeek = (new Date(year, 0, 1).getDay() + 6) % 7;

    if (startDayOfWeek < 6) {
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push({ month: -1, day: 32 - startDayOfWeek + i });
        }
    }

    for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            days.push({ month, day });
        }
    }

    const lastWeekDayCount = days.length % 7;
    if (lastWeekDayCount > 0) {
        const extraDays = 7 - lastWeekDayCount;
        for (let i = 1; i <= extraDays; i++) {
            days.push({ month: 0, day: i });
        }
    }

    return days;
};
