'use client';

import React from 'react';
import { CalendarDays, X } from 'lucide-react';
import { EventForm } from './EventForm';
import {ModalHeader} from "@/app/components/ui/ModalHeader";

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (_data: any) => void;
    defaultDates?: { start: string; end: string };
    initialData?: {
        title: string;
        start: string;
        end: string;
        description: string;
        icon: any;
        color: string;
        filename: string;
    };
}

export const EventModal = (props: EventModalProps) => {
    if (!props.isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
                <ModalHeader
                    title={props.initialData ? 'Modifier un événement' : 'Créer un événement'}
                    icon={CalendarDays}
                    onClose={props.onClose}
                />

                <EventForm
                    defaultDates={props.defaultDates}
                    initialData={props.initialData}
                    onClose={props.onClose}
                    onSubmit={props.onSubmit}
                />
            </div>
        </div>
    );
};
