import React, {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

type DropdownProps<T> = {
    options: T[];
    selected: T | null;
    onSelect: (option: T) => void;
    labelExtractor?: (option: T) => string;
};

function CustomDropdown<T>({ options, selected, onSelect, labelExtractor }: DropdownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelect = (option: T) => {
        onSelect(option);
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX, width: rect.width });
        }
    }, [isOpen]);

    return (
        <div className="relative w-full max-w-xs">
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className="w-full px-4 py-2 text-left text-gray-300 bg-gray-100 dark:text-gray-400 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="button"
            >
                {selected ? labelExtractor ? labelExtractor(selected) : String(selected) : 'Select an option'}
            </button>

            {isOpen && buttonRef.current &&
                createPortal(
                    <ul
                        className="absolute z-50 border border-gray-600 bg-gray-100 text-gray-300 dark:bg-gray-900 dark:text-gray-400 rounded-md shadow-lg max-h-60 overflow-y-auto"
                        style={{
                            position: 'absolute',
                            top: dropdownPosition.top,
                            left: dropdownPosition.left,
                            width: dropdownPosition.width,
                        }}
                    >
                        {options.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(option)}
                                className={`px-4 py-2 cursor-pointer hover:dark:bg-gray-600 dark:text-gray-100 ${
                                    selected === option ? 'bg-gray-400' : ''
                                }`}
                            >
                                {labelExtractor ? labelExtractor(option) : String(option)}
                            </li>
                        ))}
                    </ul>,
                    document.body // Render the dropdown directly in the body
                )
            }
        </div>
    );
}

export default CustomDropdown;
