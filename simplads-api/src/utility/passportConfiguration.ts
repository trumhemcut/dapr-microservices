import passport = require("passport");
import { ExtractJwt, Strategy } from "passport-jwt";

export class PassportConfiguration {
  constructor() {
    passport.use(
      new Strategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: "top_secret"
        },
        async (token, done) => {
          try {
            return done(null, token.user);
          } catch (error) {
            done(error);
          }
        }
      )
    );
  }
}
