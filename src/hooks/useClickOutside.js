import { useEffect, useRef } from 'react';

/**
 * Closes a dropdown/panel when clicking outside the referenced element.
 * @param {boolean} isOpen - Whether the target is currently visible
 * @param {function} onClose - Callback to hide the target
 * @returns {import('react').RefObject} - Attach to the container element
 */
export function useClickOutside(isOpen, onClose) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  return ref;
}
