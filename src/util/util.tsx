/** Delays an async function such that it takes at leas ms milli-seconds.
 *
 * Does not delay if it is not resolved within that time frame.
 */
export const delayAtLeast = async (cb: () => Promise<any>, ms: number) => {
  const started = Date.now();
  const res = await cb();
  const elapsed = Date.now() - started;
  const delayFurther = ms - elapsed;
  if (delayFurther > 0) {
    await new Promise((r) => setTimeout(r, delayFurther));
  }
  return res;
};
