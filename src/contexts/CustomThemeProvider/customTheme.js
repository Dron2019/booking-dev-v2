import { createTheme } from "@mui/material";

export const customTheme = createTheme({
    components: {
        MuiTooltip: {
            defaultProps: {
                placement: 'top',
                arrow: true
            },
            styleOverrides: {
                tooltip: {
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--color-text-800)',
                    padding: '4px 8px',
                    fontSize: '10px',
                    maxWidth: '175px',
                    display: 'flex',
                    alignItems: 'center',
                    svg: {
                        width: '24px',
                        height: '24px'
                    }
                },
                arrow: {
                    color: 'var(--color-text-800)'
                }
            }
        }
    },
    typography: {
        fontFamily: [
            'Gilroy',
            'sans-serif'
        ].join(','),
    },
});