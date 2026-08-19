/**
 * Delay artificial al cargar rutas de demo.
 * Configurable con `NEXT_PUBLIC_DEMO_ROUTE_LOADING_DELAY_MS` (0 = desactivado).
 */
export const DEMO_ROUTE_LOADING_DELAY_MS = Number(
  process.env.NEXT_PUBLIC_DEMO_ROUTE_LOADING_DELAY_MS ?? 0,
)

export async function awaitDemoRouteDelay(): Promise<void> {
  if (!DEMO_ROUTE_LOADING_DELAY_MS || DEMO_ROUTE_LOADING_DELAY_MS <= 0) return

  await new Promise<void>((resolve) => {
    setTimeout(resolve, DEMO_ROUTE_LOADING_DELAY_MS)
  })
}
