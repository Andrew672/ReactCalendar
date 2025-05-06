import React from 'react';

export const SuccessIcon = () => (
    <svg
        className="h-8 w-8 text-green-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
            clipRule="evenodd"
        />
    </svg>
);

export const ErrorIcon = () => (
    <svg
        className="h-6 w-6 text-red-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
            clipRule="evenodd"
        />
    </svg>
);

export const InfoIcon = () => (
    <svg
        className="h-6 w-6 text-yellow-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM11.25 7a1.25 1.25 0 1 1-2.5 0A1.25 1.25 0 0 1 11.25 7Zm-.75-.75a.75.75 0 1 0 .75-.75.75.75 0 0 0-.75.75ZM12.5 11a1.5 1.5 0 0 1-3 .001v4a1.5 1.5 0 0 1 .001-3h3Z"
            clipRule="evenodd"
        />
    </svg>
);
