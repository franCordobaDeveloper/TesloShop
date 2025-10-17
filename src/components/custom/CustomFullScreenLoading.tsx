

import React from 'react';

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'spinner' | 'dots' | 'pulse';
    text?: string;
    fullScreen?: boolean;
}

export const CustomFullScreenLoading: React.FC<LoadingProps> = ({
    size = 'md',
    variant = 'spinner',
    text,
    fullScreen = false
}) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    const dotSizes = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4'
    };

    const renderSpinner = () => (
        <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`} />
    );

    const renderDots = () => (
        <div className="flex space-x-2">
            <div className={`${dotSizes[size]} bg-blue-500 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
            <div className={`${dotSizes[size]} bg-blue-500 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
            <div className={`${dotSizes[size]} bg-blue-500 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
        </div>
    );

    const renderPulse = () => (
        <div className={`${sizeClasses[size]} bg-blue-500 rounded-full animate-pulse`} />
    );

    const renderLoader = () => {
        switch (variant) {
            case 'dots':
                return renderDots();
            case 'pulse':
                return renderPulse();
            default:
                return renderSpinner();
        }
    };

    const content = (
        <div className="flex flex-col items-center justify-center gap-3">
            {renderLoader()}
            {text && <p className="text-gray-600 text-sm font-medium">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
                {content}
            </div>
        );
    }

    return content;
};

