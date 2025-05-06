import { API_BASE_URL } from '@/app/constants/api';

export interface EventData {
    title: string;
    start: string;
    end: string;
    description: string;
    icon: string;
    color: string;
}
export const EventsService = {
    async createEvent(data: EventData): Promise<void> {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la création de l’événement');
        }
    },

    async updateEvent(filename: string, data: EventData): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/${filename}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la modification de l’événement');
        }
    },

    async deleteEvent(filename: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/${filename}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la suppression de l'événement");
        }
    },

    async getAllEvents(): Promise<any[]> {
        const response = await fetch(`${API_BASE_URL}/json`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des événements');
        }

        return await response.json();
    }
};
