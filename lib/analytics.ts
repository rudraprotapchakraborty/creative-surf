// Analytics utility functions

/**
 * Track a custom event in Google Analytics
 * @param action - The action name
 * @param category - Event category
 * @param label - Event label
 * @param value - Event value (optional)
 */
export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

/**
 * Track a page view in Google Analytics
 * @param url - The URL to track
 * @param title - The page title
 */
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "G-XXXXXXXXXX", {
      page_path: url,
      page_title: title,
    })
  }
}

/**
 * Track a user conversion or goal
 * @param conversionId - The conversion ID
 * @param label - Conversion label
 * @param value - Conversion value
 */
export const trackConversion = (conversionId: string, label: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: `G-XXXXXXXXXX/${conversionId}`,
      event_label: label,
      value: value,
      currency: "USD",
    })
  }
}

