import { useRef, useEffect } from 'react';

/**
 * Custom hook that attaches an event listener to the specified element.
 *
 * @param {string} eventName - The name of the event to listen for.
 * @param {function} handler - The event handler function.
 * @param {HTMLElement} [element=window] - The element to attach the event listener to.
 * @param {object} [options={}] - Additional options for the event listener.
 * @param {boolean} [options.capture] - Specifies whether the event should be captured during the propagation phase.
 * @param {boolean} [options.passive] - Specifies whether the event listener will never call preventDefault().
 * @param {boolean} [options.once] - Specifies whether the event listener should only be invoked once.
 */
const useEventListener = (
    eventName,
    handler,
    element = window,
    options = {}
) => {
    const savedHandler = useRef();
    const { capture, passive, once } = options;

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) {
            return;
        }

        const eventListener = (event) => savedHandler.current(event);
        const opts = { capture, passive, once };
        element.addEventListener(eventName, eventListener, opts);
        return () => {
            element.removeEventListener(eventName, eventListener, opts);
        };
    }, [eventName, element, capture, passive, once]);
};

export default useEventListener;