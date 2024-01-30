import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from "@mui/material";
import { customTheme } from './customTheme';



export default function CustomThemeProvider({ children }) {
    return (
        <ThemeProvider theme={customTheme}>
            {children}
        </ThemeProvider>
    )
}

CustomThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
