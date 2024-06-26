import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/themeContext"

export function ThemeButton() {
  const { theme, setTheme } = useTheme()

  return (
    <Button onClick={()=> theme === 'system' || theme === 'light'? setTheme('dark'): setTheme('light')} variant="outline" size="icon" className="bg-background rounded-full border border-foreground/30">
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
    </Button>
  )
}
