import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { ABILITY_IDS, can } from "./constants/abilities";

// Page to ability mapping
const PAGE_PERMISSIONS: Record<string, number> = {
  "/branches": ABILITY_IDS.VIEW_BRANCHES,
  "/employees": ABILITY_IDS.VIEW_EMPLOYEES,
  "/clients": ABILITY_IDS.VIEW_CLIENTS,
  "/services": ABILITY_IDS.VIEW_SERVICES,
  "/expenses": ABILITY_IDS.VIEW_EXPENSES,
  "/discounts": ABILITY_IDS.VIEW_DISCOUNTS,
  "/orders": ABILITY_IDS.VIEW_ORDERS,
  "/orders/new": ABILITY_IDS.CREATE_ORDER,
  "/agents": ABILITY_IDS.VIEW_AGENTS,
  "/reports/executive": ABILITY_IDS.VIEW_EXECUTIVE_REPORT,
  "/reports/daily/details": ABILITY_IDS.VIEW_DAILY_DETAILS_REPORT,
  "/reports/daily": ABILITY_IDS.VIEW_DAILY_REPORT,
  "/pending-orders": ABILITY_IDS.VIEW_PENDING_ORDERS,
  "/new-orders": ABILITY_IDS.VIEW_NEW_ORDERS,
  "/pending-certificates": ABILITY_IDS.VIEW_PENDING_CERTIFICATES,
  "/new-certificates": ABILITY_IDS.VIEW_NEW_CERTIFICATES,
  "/collected": ABILITY_IDS.VIEW_COLLECTED,
  "/in-progress": ABILITY_IDS.VIEW_IN_PROGRESS,
  "/completed-orders": ABILITY_IDS.VIEW_COMPLETED_ORDERS,
  "/order-receipt": ABILITY_IDS.VIEW_ORDER_RECEIPT,
  "/fulfillment": ABILITY_IDS.VIEW_CLIENT_FULFILLMENT,
  "/client-fulfillment": ABILITY_IDS.VIEW_FULFILLMENT,
  "/certificate-fulfillment": ABILITY_IDS.VIEW_CERTIFICATE_FULFILLMENT,
  "/dashboard": ABILITY_IDS.VIEW_DASHBOARD,
  "/commissions": ABILITY_IDS.VIEW_COMMISSIONS,
};

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");
  const pathname = request.nextUrl.pathname;

  // If user is not authenticated and trying to access protected routes
  if (!session && !isAuthPage) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (session && isAuthPage) {
    const dashboardUrl = new URL("/branches", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Redirect root to first ability page
  if (pathname === "/") {
    const dashboardUrl = new URL(
      session?.user.abilities.find((a) => a.href)?.href || "/login",
      request.url,
    );
    return NextResponse.redirect(dashboardUrl);
  }

  // Check page permissions for authenticated users
  if (session) {
    const userAbilityIds =
      session.user?.abilities?.map((a: { id: number }) => a.id) || [];

    // Check if the page requires specific permission
    const requiredAbility = PAGE_PERMISSIONS[pathname];

    if (requiredAbility && !can(userAbilityIds, requiredAbility)) {
      const unauthorizedUrl = new URL("/unauthorized", request.url);
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  return NextResponse.next();
}

// Configure which routes should run the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
