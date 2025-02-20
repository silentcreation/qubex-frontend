export function formatNumber(value: number, locale: string = "en-EN"): string {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
  }
  