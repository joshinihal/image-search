import { useState, useCallback } from "react";

const useHttp = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest =  useCallback( async (url, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Request failed!");
            }
            const data = await response.json();
            applyData(data);
        } catch (error) {
            const errorMessage = error.message || 'Something went wrong';
            setError(errorMessage);
        };
        setIsLoading(false);
    }, []);
    return {sendRequest, error, isLoading};
};

export default useHttp;