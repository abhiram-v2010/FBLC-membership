// this code file is for the BACKEND of the login page
// all we're doing here is taking credentials & seeing if they match in the DB
// if it matches, spit out 200 OK. else, spit out 401 unauthorized (authentication failure)

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body ?? {};

    // TODO setup DB, for now keep as-is
    if (email === "demo@fblc.test" && password === "password") {
      return new Response(JSON.stringify({ ok: true, message: "Login successful." }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: false, message: "Invalid credentials." }), {

      //TODO add real auth
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
