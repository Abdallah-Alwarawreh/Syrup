import { NextResponse, userAgent } from 'next/server'
import type { NextRequest } from 'next/server'

// Add the extension download link for chromium-based browsers
const extensionMarketplace = {
  "Firefox": "https://addons.mozilla.org/en-US/firefox/addon/syrup/",
  "Chrome": "https://chromewebstore.google.com/detail/syrup/odfgjmajnbkiabjnfiijllkihjpilfch",
}

// Returns the corresponding URL according to the browser name
function getMarketplaceURL(browserName: string | null | undefined): string {
  const availableMarketplaces = Object.keys(extensionMarketplace)
  const availableMarketplacesLink = Object.values(extensionMarketplace)
  const index = availableMarketplaces.indexOf(browserName!)
  if (index != -1) {
    return availableMarketplacesLink[index]
  } else {
    // If the browser is not listed in the extensionMarketplace object, use the chrome web store link
    return extensionMarketplace["Chrome"]
  }
}

export function middleware(request: NextRequest) {
  // Redirects the user to the corresponding browser marketplace
  const { browser } = userAgent(request)
  return NextResponse.redirect(new URL(getMarketplaceURL(browser.name), request.url))
}
 
export const config = {
  matcher: '/download',
}
