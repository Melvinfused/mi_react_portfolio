import React, { useState, useEffect, useRef } from "react";
import { useEditMode } from "./EditContext";

const EditableText = ({ children, storageKey, as: Component = "span", className = "" }) => {
    const { isEditMode } = useEditMode();
    const [text, setText] = useState(children);
    const elementRef = useRef(null);

    // Load saved text from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(`editable_${storageKey}`);
        if (saved) {
            setText(saved);
        }
    }, [storageKey]);

    // Handle text changes
    const handleInput = (e) => {
        const newText = e.target.innerText;
        setText(newText);
        localStorage.setItem(`editable_${storageKey}`, newText);
    };

    // Prevent line breaks on Enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.target.blur();
        }
    };

    return (
        <Component
            ref={elementRef}
            className={`${className} ${isEditMode ? "editable-text" : ""}`}
            contentEditable={isEditMode}
            suppressContentEditableWarning={true}
            onBlur={handleInput}
            onKeyDown={handleKeyDown}
            spellCheck={false}
        >
            {text}
        </Component>
    );
};

// Multi-line version for paragraphs
export const EditableParagraph = ({ children, storageKey, className = "" }) => {
    const { isEditMode } = useEditMode();
    const [text, setText] = useState(children);

    useEffect(() => {
        const saved = localStorage.getItem(`editable_${storageKey}`);
        if (saved) {
            setText(saved);
        }
    }, [storageKey]);

    const handleInput = (e) => {
        const newText = e.target.innerText;
        setText(newText);
        localStorage.setItem(`editable_${storageKey}`, newText);
    };

    return (
        <p
            className={`${className} ${isEditMode ? "editable-text" : ""}`}
            contentEditable={isEditMode}
            suppressContentEditableWarning={true}
            onBlur={handleInput}
            spellCheck={false}
        >
            {text}
        </p>
    );
};

export default EditableText;
