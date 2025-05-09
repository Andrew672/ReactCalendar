
import { CalendarDays } from 'lucide-react';
import { iconOptions } from '@/app/components/Calendar/EventModal/iconOptions';
import type { CalendarEvent } from './Calendar';

export function mapApiEventToCalendarEvent(apiEvent: any): CalendarEvent {
    const IconComponent =
        iconOptions.find(opt => opt.key === apiEvent.icon)?.icon ?? CalendarDays;

    return {
        uid: apiEvent.uid,
        title: apiEvent.title,
        description: apiEvent.description,
        filename: apiEvent.filename,
        start: apiEvent.startDate,
        end: apiEvent.endDate,
        icon: IconComponent,
        color: apiEvent.color ?? '#3b82f6',
    };
}
