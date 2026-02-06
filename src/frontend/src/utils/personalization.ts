/**
 * Utilities for personalizing the Valentine's experience with recipient names.
 */

import { getMainExperienceBaseURL } from './routing';

const DEFAULT_NAME = 'Guddi';
const MAX_NAME_LENGTH = 50;

/**
 * Normalizes and validates a recipient name.
 * Returns the trimmed name if valid, or the default name if invalid/empty.
 */
export function normalizeRecipientName(name: string | null | undefined): string {
  if (!name) return DEFAULT_NAME;
  
  const trimmed = name.trim();
  if (trimmed.length === 0) return DEFAULT_NAME;
  if (trimmed.length > MAX_NAME_LENGTH) {
    return trimmed.substring(0, MAX_NAME_LENGTH);
  }
  
  return trimmed;
}

/**
 * Parses the recipient name from the current URL.
 * Supports both standard query parameters (?name=) and hash-based query parameters (#/?name=).
 * Returns the default name if no valid name parameter is found.
 */
export function getRecipientNameFromURL(): string {
  // Check standard query parameters first
  const searchParams = new URLSearchParams(window.location.search);
  let name = searchParams.get('name');
  
  // If not found, check hash-based query parameters
  if (!name && window.location.hash) {
    const hashParts = window.location.hash.split('?');
    if (hashParts.length > 1) {
      const hashParams = new URLSearchParams(hashParts[1]);
      name = hashParams.get('name');
    }
  }
  
  return normalizeRecipientName(name);
}

/**
 * Builds a shareable URL with the recipient name as a query parameter.
 * Ensures the URL always points to the main Valentine experience (no tool route).
 * Uses the routing utility to get a clean base URL.
 */
export function buildShareableURL(recipientName: string): string {
  const normalized = normalizeRecipientName(recipientName);
  
  // Get the base URL for the main experience (strips /tool if present)
  const baseURL = getMainExperienceBaseURL();
  
  // If it's the default name, return the base URL without parameters
  if (normalized === DEFAULT_NAME) {
    return baseURL;
  }
  
  const url = new URL(baseURL);
  url.searchParams.set('name', normalized);
  return url.toString();
}

/**
 * Returns the default recipient name.
 */
export function getDefaultName(): string {
  return DEFAULT_NAME;
}
