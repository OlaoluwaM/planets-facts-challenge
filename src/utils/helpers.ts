export function hexToRgb(hex: string, alpha = 1): string {
  const { r, g, b } = {
    r: parseInt(hex.substr(1, 2), 16),
    g: parseInt(hex.substr(3, 2), 16),
    b: parseInt(hex.substr(5, 2), 16),
  };
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function rawDataType<T>(value: T): string {
  const _toString = Object.prototype.toString;
  return _toString.call(value).slice(8, -1).toLowerCase();
}

type Filter<T> = T extends Record<string, unknown> | never[] | '' ? null : T;

export function normalize<K>(input: K): Filter<K> {
  let returnValue: K | null = input;
  if (Array.isArray(input) && input.length === 0) returnValue = null;
  if (typeof input === 'string' && input === '') returnValue = null;
  if (typeof input === 'object' && Object.keys(input).length === 0) returnValue = null;
  return returnValue as Filter<K>;
}
