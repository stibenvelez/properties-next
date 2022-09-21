import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";

type iQueryState = {
    [key: string]: string;
};

export const useSearchParams = () => {
    const [queries, setQueries] = useState<iQueryState>({} as iQueryState);
    const { search } = useLocation();

    const onDecodeParams = useCallback((params: string) => {
        const replaceFirtCharacter = params.replace("?", "");
        const splitString = replaceFirtCharacter.split("&");

        const formattedQueries = {} as iQueryState;
        
        splitString.map((query) => {
            const [key, value] = query.split("=");
            Object.assign(formattedQueries, { [key]: value });
        });
        
        setQueries(formattedQueries);
    }, []);

    useEffect(() => {
        if (search.trim()) {
            onDecodeParams(search);
        }
    }, [onDecodeParams, search]);

    return queries;
};
