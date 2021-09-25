import { DeviceTypes, Devices, Dimensions } from '../types/custom.d';

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

export function resolveDeviceTypFromDimension(deviceDimension: Dimensions): Devices {
  return DeviceTypes[deviceDimension];
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  ms = 0
): (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): any {
    // eslint-disable-next-line
    clearTimeout(timeoutId!);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

export function getLastPathSegment(path: string): string {
  const indexOfLastBackslash = path.lastIndexOf('/');

  return path.slice(indexOfLastBackslash + 1);
}

export function extractResourceNameOnly(resourcePath: string): string {
  const indexOfLastSlash = resourcePath.lastIndexOf('/');

  const indexOfDot = resourcePath.lastIndexOf('.');

  return resourcePath.slice(indexOfLastSlash + 1, indexOfDot);
}

export function removeLastPartOfUrl(url: string): string {
  const indexOfLastSlash = url.lastIndexOf('/');

  return url.slice(0, indexOfLastSlash);
}
