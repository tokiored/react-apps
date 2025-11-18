import { useTheme } from '../hooks/useTheme'
import './ThemeSelector.css'
import modeIcon from '../assets/mode-icon.svg'

const themeColors = ['purple', 'green', 'blue']

export default function ThemeSelecter() {
    const { changeColor, changeMode, mode } = useTheme()
    return (
        <div className="theme-selector">
            <div className="mode-toggle">
                <img
                    src={modeIcon}
                    alt="Light or dark mode"
                    onClick={() =>
                        changeMode(mode === 'dark' ? 'light' : 'dark')
                    }
                    style={{
                        filter: mode === 'dark' ? 'invert(1)' : 'none',
                    }}
                />
            </div>
            <div className="theme-buttons">
                {themeColors &&
                    themeColors.map((item) => (
                        <div
                            className="btn"
                            key={item}
                            onClick={() => changeColor(item)}
                            style={{ background: item }}
                        ></div>
                    ))}
            </div>
        </div>
    )
}
