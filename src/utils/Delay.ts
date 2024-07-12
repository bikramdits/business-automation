export function delay(cb: any, delays = 1000 as any) {
  let timeout: string | number | NodeJS.Timeout | undefined;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delays);
  };
}
