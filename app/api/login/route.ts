// this code file is for the BACKEND of the login page
// all we're doing here is taking credentials & seeing if they match in the DB
// if it matches, spit out 200 OK. else, spit out 401 unauthorized (authentication failure)

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body ?? {};

    // Demo credentials for local testing to avoid setting up a db rn
    if (email === "demo@fblc.test" && password === "password") {
      return new Response(JSON.stringify({ ok: true, message: "Demo login successful." }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: false, message: "Invalid credentials. Try demo@fblc.test / password" }), {
    //obviously remove this and implement real auth later
    
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
