export default function useDarkMode() {
  const isDark = useDark({
    storageKey: 'us-theme',
    selector: 'body',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
  })

  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark,
  }
}
