export function randomChar() {
  const MAX = 120;
  const MIN = 63;
  let c = Math.floor(Math.random() * (MAX - MIN) + MIN);
  if (c === 63) c = 32;
  if (c === 64) c = 46;

  return String.fromCharCode(c);
}
