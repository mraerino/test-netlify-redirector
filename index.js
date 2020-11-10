const redirector = require("netlify-redirector");

const test = async () => {
  const matcher = await redirector.parsePlain(
    "/admin/* /admin/:splat 200 Role=admin",
    {
      jwtSecret: "secret",
      jwtRoleClaim: "app_metadata.authorization.roles",
    }
  );

  const nf_jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4OTM0NTYwMDAsInN1YiI6ImI1YmUwMTk2LWNmNGMtNGRmZC04MTcyLTg4NDNkOGQ4ZmMyNSIsImFwcF9tZXRhZGF0YSI6eyJhdXRob3JpemF0aW9uIjp7InJvbGVzIjpbImFkbWluIl19fX0.MQmW0NwHrAIx3ACp8EJtjn8B1gGoQ54HR_yFukoPHG0";
  const cookieValues = {
    nf_jwt,
  };
  const headers = {
    host: "localhost:8888",
    cookie: `nf_jwt=${nf_jwt}`,
  };
  const request = {
    scheme: "http",
    host: "localhost",
    path: "/admin/foo",
    headers,
    cookies: {},
    cookieValues,
    getHeader: (name) => headers[name.toLowerCase()] || "",
    getCookie: (key) => cookieValues[key] || "",
  };

  const match = matcher.match(request);
  console.log(match);
};

test();
