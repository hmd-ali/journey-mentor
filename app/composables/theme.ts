export const useTheme = () => {
  type Theme = 'light' | 'dark'

  const theme = useCookie<Theme>('theme', {
    default: () => 'light',
  })

  useHead(() => ({
    htmlAttrs: {
      class: theme.value,
    },
  }))

  const setTheme = (value: Theme) => {
    theme.value = value
  }

  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return {
    theme,
    toggleTheme,
  }
}
