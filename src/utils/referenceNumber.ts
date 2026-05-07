const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const REF_LENGTH = 6;

/**
 * Generate a booking reference number in the format CLN-XXXXXX
 * where X is an uppercase alphanumeric character.
 */
export function generateReferenceNumber(): string {
  let code = '';
  for (let i = 0; i < REF_LENGTH; i++) {
    code += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return `CLN-${code}`;
}
