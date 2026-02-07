/**
 * Routing utilities for detecting and navigating between the main Valentine experience
 * and the wishlink tool page, handling various URL patterns including admin tokens.
 */

/**
 * Checks if the current location indicates the tool route.
 * Handles multiple patterns:
 * - Hash routing: #/tool, #/tool/, #/tool?params, #/site-root/tool
 * - Admin token with hash: #caffeineAdminToken=.../tool or #caffeineAdminToken=.../site-root/tool
 * - Pathname routing: /tool or /site-root/tool
 */
export function isToolRoute(): boolean {
  const { pathname, hash } = window.location;
  
  // Check pathname for /tool (with or without base path)
  if (pathname.endsWith('/tool') || pathname.includes('/tool/')) {
    return true;
  }
  
  // Check hash for various patterns
  if (hash) {
    // Normalize hash: remove leading # and trailing slashes
    const normalizedHash = hash.replace(/^#/, '').replace(/\/$/, '');
    
    // Split by ? or & to separate path from query params
    const hashPath = normalizedHash.split(/[?&]/)[0];
    
    // Check if the path contains /tool as a segment
    // This handles: #/tool, #/site-root/tool, etc.
    const segments = hashPath.split('/').filter(s => s.length > 0);
    if (segments.includes('tool')) {
      return true;
    }
    
    // Admin token pattern: extract the path after the token
    // Pattern: #caffeineAdminToken=<token>/path or #caffeineAdminToken=<token>?param=value
    const adminTokenMatch = hash.match(/#caffeineAdminToken=[^/]+(\/[^?]*)/);
    if (adminTokenMatch) {
      const path = adminTokenMatch[1];
      // Normalize path: remove trailing slashes
      const normalizedPath = path.replace(/\/$/, '');
      // Check if path ends with /tool (e.g., /tool or /site-root/tool)
      if (normalizedPath.endsWith('/tool') || normalizedPath.includes('/tool/')) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Navigates to the main Valentine experience, clearing any tool route.
 * Handles both hash-based and pathname-based routing.
 */
export function navigateToMainExperience(): void {
  const { pathname, hash, search } = window.location;
  
  // If pathname ends with /tool, remove it
  if (pathname.endsWith('/tool') || pathname.includes('/tool/')) {
    const newPathname = pathname.replace(/\/tool\/?.*$/, '');
    const newURL = newPathname + search;
    window.history.replaceState({}, '', newURL);
    // Trigger a popstate event to update the app
    window.dispatchEvent(new PopStateEvent('popstate'));
  } else if (hash) {
    // Handle hash-based routing
    const normalizedHash = hash.replace(/^#/, '');
    
    // Check if it's an admin token pattern
    const adminTokenMatch = hash.match(/#(caffeineAdminToken=[^/]+)(\/[^?]*)/);
    if (adminTokenMatch) {
      const tokenPart = adminTokenMatch[1];
      const pathPart = adminTokenMatch[2];
      
      // Remove /tool from the path
      const cleanPath = pathPart.replace(/\/tool\/?.*$/, '');
      
      // If there's still a path after removing /tool, keep it; otherwise just keep the token
      const newHash = cleanPath ? `#${tokenPart}${cleanPath}` : `#${tokenPart}`;
      window.history.replaceState({}, '', newHash);
    } else {
      // For regular hash routes, just clear the hash
      window.history.replaceState({}, '', window.location.pathname + search);
    }
    
    // Trigger a hashchange event to update the app
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
}

/**
 * Navigates to the tool page.
 */
export function navigateToTool(): void {
  window.location.hash = '#/tool';
}

/**
 * Gets the base URL for the main Valentine experience, stripping any tool route.
 * Used for generating shareable links that always point to the main experience.
 */
export function getMainExperienceBaseURL(): string {
  const { origin, pathname } = window.location;
  
  // Remove trailing /tool if present
  const cleanPathname = pathname.endsWith('/tool') 
    ? pathname.slice(0, -5) 
    : pathname.replace(/\/tool\/?.*$/, '');
  
  return origin + cleanPathname;
}

/**
 * Builds a special access link URL for the tool page.
 * This generates an absolute URL that:
 * - Preserves any caffeineAdminToken hash fragment
 * - Points to the /tool route
 * - Excludes personalization query params (e.g., ?name=)
 * - Respects the deployed base path
 * 
 * @returns Full absolute URL for accessing the tool page
 */
export function buildToolSpecialAccessLinkURL(): string {
  const { origin, pathname, hash } = window.location;
  
  // Get the base origin + pathname (respects any deployed base path)
  // Intentionally exclude search params (no ?name= etc.)
  const baseURL = origin + pathname;
  
  // Check if there's a caffeineAdminToken in the current hash
  const adminTokenMatch = hash.match(/#(caffeineAdminToken=[^/]+)/);
  
  if (adminTokenMatch) {
    // Preserve the admin token and append /tool
    const tokenPart = adminTokenMatch[1];
    return `${baseURL}#${tokenPart}/tool`;
  } else {
    // No admin token, just use #/tool
    return `${baseURL}#/tool`;
  }
}
