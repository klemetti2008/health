export const phoneRegexes = {
  FI: /^\\+358\\d{9}$/,
  FR: /^\\+33\\d{9}$/,
  SE: /^\\+46\\d{9}$/,
  US: /^\\+1\\d{10}$/,
  IR: /^\\+98\\d{10}$/,
} as { [key: string]: RegExp }

export function phoneRegexp(countryCode: string) {
  return phoneRegexes[countryCode] || /.*/
}