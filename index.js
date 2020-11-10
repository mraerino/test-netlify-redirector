const redirector = require("netlify-redirector");

const test = async () => {
  const matcher = await redirector.parsePlain(
    "/admin/* /admin/:splat 200 Role=admin",
    {
      jwtSecret: "secret",
      jwtRole: "app_metadata.authorization.roles",
    }
  );

  const nf_jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIxNDkwMTc5NTYwMDAsImFwcF9tZXRhZGF0YSI6eyJhdXRob3JpemF0aW9uIjp7InJvbGVzIjpbImFkbWluIl19fX0.m7RC0H0NjZ23SKT4IdJpaWTMwTZxIG_rvw72nZEq-84";
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
