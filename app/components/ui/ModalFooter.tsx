import React from 'react';
import { CloseButton } from '@/app/components/Calendar/EventModal/buttons/CloseButton';
import { SubmitButton } from '@/app/components/Calendar/EventModal/buttons/SubmitButton';

interface ModalFooterProps {
    onClose: () => void;
    submitLabel: string;
}

export const ModalFooter = (props: ModalFooterProps) => {
    return (
        <div className="flex justify-end gap-3 pt-2">
            <CloseButton onClick={props.onClose} />
            <SubmitButton label={props.submitLabel} />
        </div>
    );
};
