const MIN_DELAY_MS = 400
const MAX_DELAY_MS = 800

export function simulateApiDelay(): Promise<void> {
  const delay = Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1)) + MIN_DELAY_MS
  return new Promise((resolve) => {
    window.setTimeout(resolve, delay)
  })
}
