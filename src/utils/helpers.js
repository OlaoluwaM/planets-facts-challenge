export function hexToRgb(hex, alpha = 1) {
  const { r, g, b } = {
    r: parseInt(hex.substr(1, 2), 16),
    g: parseInt(hex.substr(3, 2), 16),
    b: parseInt(hex.substr(5, 2), 16),
  };
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function rawDataType(value) {
  const _toString = Object.prototype.toString;
  return _toString.call(value).slice(8, -1).toLowerCase();
}

export function normalize(input) {
  if (input && (input?.length === 0 || Object.keys(input).length === 0 || input === '')) {
    return null;
  }
  return input;
}
