import PropTypes from "prop-types"
import React, { useState } from 'react';
import { Link } from "react-router-dom";

/**
 * Wraps a link component with dynamic routing based on the provided text and routes.
 * If the text contains a placeholder in the format "$key{{value}}", it will be replaced with a link to the corresponding route.
 * If no placeholder is found, the text will be rendered as is.
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be rendered, which may contain a placeholder.
 * @param {Object} props.routes - An object containing key-value pairs of route names and their corresponding paths.
 * @returns {JSX.Element} - The rendered link component.
 */
export default function LinkWrapper({ text = '', routes = {} }) {
    const regexp = /\s\$(.+)\{\{([^{}]+)\}\}/;
    const matches = text.match(regexp);

    const [hovered, setHovered] = useState(false);

    const styles = {
        textDecoration: 'underline',
    }
    if (hovered) {
        styles.color = 'var(--color-accent-secondary-900)';
    }

    if (!matches) return <div>{text}</div>;
    

    return (
        <>
            {matches.input.replace(regexp, '')}
            <Link 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                to={routes[matches[1]]} 
                className="text-color-text-900" 
                style={styles}
            > {matches[2]}</Link>
        </>
    );
}
LinkWrapper.propTypes = {
    text: PropTypes.string,
    routes: PropTypes.object
}
