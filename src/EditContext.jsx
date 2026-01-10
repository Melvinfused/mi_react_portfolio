import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import ServerStatus from "./ServerStatus";

const EditContext = createContext();

const SECRET_CODE = "9265";

// Only allow edit mode on localhost (development)
const isLocalhost = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const EditProvider = ({ children }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [serverOnline, setServerOnline] = useState(false);
    const [keySequence, setKeySequence] = useState("");
    const location = useLocation();
    const isOnPowerEdit = location.pathname === "/power-edit";
    const isOnHome = location.pathname === "/";

    const handleKeyPress = useCallback((e) => {
        // Only allow on localhost AND when server is online
        if (!isLocalhost || !serverOnline) return;

        // Only listen for number keys
        if (!/^[0-9]$/.test(e.key)) {
            setKeySequence("");
            return;
        }

        const newSequence = keySequence + e.key;

        // Check if we're on track
        if (SECRET_CODE.startsWith(newSequence)) {
            setKeySequence(newSequence);

            // Full match - toggle edit mode
            if (newSequence === SECRET_CODE) {
                setIsEditMode(prev => !prev);
                setKeySequence("");
            }
        } else {
            // Wrong key, reset
            setKeySequence(e.key);
        }
    }, [keySequence, serverOnline]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);

    // Reset sequence after 2 seconds of inactivity
    useEffect(() => {
        if (keySequence) {
            const timer = setTimeout(() => setKeySequence(""), 2000);
            return () => clearTimeout(timer);
        }
    }, [keySequence]);

    // Handle server status change
    const handleServerStatusChange = useCallback((online) => {
        setServerOnline(online);
        // If server goes offline while in edit mode, disable it
        if (!online && isEditMode) {
            setIsEditMode(false);
        }
    }, [isEditMode]);

    return (
        <EditContext.Provider value={{ isEditMode, setIsEditMode, serverOnline }}>
            {children}

            {/* Server status indicator - only on home screen and localhost */}
            {isLocalhost && isOnHome && (
                <ServerStatus onStatusChange={handleServerStatusChange} />
            )}

            {isEditMode && !isOnPowerEdit && (
                <div className="edit-mode-badge">
                    Composer Connected
                    <Link to="/power-edit" className="power-edit-btn">Power Edit</Link>
                </div>
            )}
        </EditContext.Provider>
    );
};

export const useEditMode = () => {
    const context = useContext(EditContext);
    if (!context) {
        throw new Error("useEditMode must be used within EditProvider");
    }
    return context;
};
