/**
 * Constants shared between server code (`lib/subscription.ts`, which also
 * imports the MongoDB driver) and client components (which must not — that
 * driver pulls in Node built-ins the browser bundle can't resolve). Keep
 * this file free of any server-only import.
 */
export const FREE_MONTHLY_GENERATIONS = 3;
