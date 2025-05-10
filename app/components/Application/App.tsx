'use client';

import React from 'react';
import { useSnack } from '@/app/providers/SnackProvider';
import { Calendar } from '@/app/components/Calendar/ContinuousCalendar/Calendar';
import { monthNames} from "@/app/services/utils";

export default function MainApplication() {
    const { createSnack } = useSnack();

    const onClickHandler = (day: number, month: number, year: number) => {
        const snackMessage = `Jour sélectionné : ${day} ${monthNames[month]} ${year}`;
        createSnack(snackMessage, 'success');
    };

    return (
        <div className="relative flex h-screen max-h-screen w-full flex-col gap-4 px-4 pt-4 items-center justify-center">
            <div className="relative h-full overflow-auto mt-20">
                <Calendar onClick={onClickHandler} />
            </div>
        </div>
    );
}
