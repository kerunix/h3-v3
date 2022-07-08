export default function useDarkMode() {
  const isDark = computed(() => useColorMode()?.preference === 'dark')

  function toggleColorMode() {
    useColorMode().preference = useColorMode()?.preference === 'dark' ? 'light' : 'dark'
  }

  return {
    isDark,
    toggleColorMode,
  }
}
