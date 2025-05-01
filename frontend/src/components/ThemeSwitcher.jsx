import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon } from "react-icons/fi";
import { IoSunny } from "react-icons/io5";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const changeColor = () => {
        if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    return (
        <div>
            <button onClick={changeColor}>{
                theme === 'dark' ? <IoSunny/> : <FiMoon />
            }</button>
        </div>
    )
};