// server/api/logout.ts

export default defineEventHandler((event) => {
  // Set the cookie's expiry date to a past date to effectively delete it
  setCookie(event, "placements_access_token", "", {
    path: "/",
    expires: new Date(0),
  });

  return { ok: true };
});
