import { createContext, useReducer } from 'react'

export const ThemeContext = createContext()

// reducer function called by dispatch()
function themeReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_THEME':
            return { ...state, color: action.payload }
        case 'CHANGE_MODE':
            return {
                ...state,
                mode: action.payload,
            }
        default:
            return state
    }
}

export function ThemeProvider({ children }) {
    // set reducer function and initial state
    const [state, dispatch] = useReducer(themeReducer, {
        mode: 'dark',
        color: 'purple',
    })

    const changeColor = (color) =>
        dispatch({ type: 'CHANGE_THEME', payload: color })

    const changeMode = (mode) =>
        dispatch({ type: 'CHANGE_MODE', payload: mode })

    return (
        <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}
