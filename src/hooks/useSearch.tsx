import { useRef, type KeyboardEvent } from "react";
import { useSearchParams } from "react-router";

export const useSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);

    const query = searchParams.get('query') || '';

    const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        const query = inputRef.current?.value.trim();
        const newSearchParams = new URLSearchParams(searchParams); // Mantiene otros params

        if (!query) {
            newSearchParams.delete('query');
        } else {
            newSearchParams.set('query', query);
            newSearchParams.set('page', '1'); // Reset página al buscar
        }

        setSearchParams(newSearchParams);
    };

    const clearSearch = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('query');
        setSearchParams(newSearchParams);
    };

    return {
        inputRef,
        query,
        handleSearch,
        clearSearch,
        searchParams,
        setSearchParams
    };
};