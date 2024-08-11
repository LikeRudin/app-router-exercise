import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

const getSession = () =>
  getIronSession<SessionContent>(cookies(), {
    cookieName: "cookie-that-i-made",
    password: process.env.COOKIE_SECRET!,
  });

export default getSession;
