export function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay: number
): F {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  } as F;
}
