import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body ?? {};

    // Demo credentials for local testing
    if (email === "demo@fblc.test" && password === "password") {
      const response = NextResponse.json(
        { ok: true, message: "Demo login successful.", role: "user" },
        { status: 200 }
      );

      response.cookies.set("auth_token", "demo-user-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 30, // 30 minutes
        path: "/",
      });
      return response;
    }

    // Admin account (for posting announcements)
    if (email === "admin@fblc.test" && password === "adminpass") {
      const response = NextResponse.json(
        { ok: true, message: "Admin login successful.", role: "admin" },
        { status: 200 }
      );

      response.cookies.set("auth_token", "admin-user-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 30, // 30 minutes
        path: "/",
      });
      return response;
    }

    return NextResponse.json(
      { ok: false, message: "Invalid credentials. Try demo@fblc.test / password" },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Bad request" },
      { status: 400 }
    );
  }
}
