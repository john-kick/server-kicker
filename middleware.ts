import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const excludedPaths = ["/dashboard", "/showcase"];

  if (!excludedPaths.some((path) => req.url.includes(path))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const validateEndpoint =
    process.env.NEXT_PUBLIC_AUTH_SERVER_URL + "/validate";

  try {
    const response = await fetch(validateEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);

      return NextResponse.redirect(new URL("/login", req.url));
    }

    const result = await response.json();

    if (result.token) {
      const res = NextResponse.next();

      res.cookies.set("token", result.token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
      });

      return res;
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token validation failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
