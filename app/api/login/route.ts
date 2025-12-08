export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body ?? {};

    // Demo credentials for local testing
    if (email === "demo@fblc.test" && password === "password") {
      return new Response(
        JSON.stringify({ ok: true, message: "Demo login successful.", role: "user" }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    }

    // Admin account (for posting announcements)
    if (email === "admin@fblc.test" && password === "adminpass") {
      return new Response(
        JSON.stringify({ ok: true, message: "Admin login successful.", role: "admin" }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    }

    // Regular user account
    if (email === "user@fblc.test" && password === "userpass") {
      return new Response(
        JSON.stringify({ ok: true, message: "User login successful.", role: "user" }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ ok: false, message: "Invalid credentials. Try demo@fblc.test / password" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, message: "Bad request" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
}
