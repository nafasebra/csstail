// Helper to safely access nested properties
export function getNestedProperty(obj: any, keys: string[]): any {
  return keys.reduce((o, key) => (o && key in o ? o[key] : undefined), obj);
}

