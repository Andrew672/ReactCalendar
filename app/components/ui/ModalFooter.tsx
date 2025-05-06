import React from 'react';
import { CloseButton } from '@/app/components/Calendar/EventModal/buttons/CloseButton';
import { SubmitButton } from '@/app/components/Calendar/EventModal/buttons/SubmitButton';

interface ModalFooterProps {
    onClose: () => void;
    submitLabel: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ onClose, submitLabel }) => {
    return (
        <div className="flex justify-end gap-3 pt-2">
            <CloseButton onClick={onClose} />
            <SubmitButton label={submitLabel} />
        </div>
    );
};
