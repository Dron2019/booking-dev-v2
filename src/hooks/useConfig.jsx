import { useState, useEffect } from 'react';
import settings from '../config.json';

const useConfig = () => {
    const [config, _] = useState(settings);

    return config;
};

export default useConfig;
