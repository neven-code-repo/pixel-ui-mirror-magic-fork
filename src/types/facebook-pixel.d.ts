
// Type definitions for Facebook Pixel
declare function fbq(
  eventType: string,
  eventName: string,
  parameters?: Record<string, any>
): void;

declare function fbq(
  eventType: string,
  eventName: string,
  eventId: string,
  parameters?: Record<string, any>
): void;
