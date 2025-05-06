import { CalendarEvent } from '../ContinuousCalendar/Calendar';

export interface CalendarDayProps {
    events: CalendarEvent[];
    onQuickAdd: (day: number, month: number, year: number) => void;
}
