import { useEffect, useState } from 'react';
import config from '../config.json';

const useCurrencies = () => {
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        // Fetch currencies from config or any other source
        const fetchedCurrencies = config.currencies;

        // Update the state with the fetched currencies
        setCurrencies(fetchedCurrencies);
    }, []);

    return currencies;
};

export default useCurrencies;
