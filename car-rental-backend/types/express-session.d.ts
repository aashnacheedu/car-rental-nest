// types/express-session.d.ts
import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

declare module 'express' {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}
