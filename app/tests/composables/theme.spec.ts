import { describe, expect, it } from 'vitest'

describe('app/composables/theme.ts', async () => {
  it('should set the default theme to light', async () => {
    const { theme } = useTheme()
    expect(theme.value).toBe('light')
  })

  it('should toggle the theme between light and dark', async () => {
    const { theme, toggleTheme } = useTheme()

    toggleTheme()
    expect(theme.value).toBe('dark')

    toggleTheme()
    expect(theme.value).toBe('light')
  })
})
