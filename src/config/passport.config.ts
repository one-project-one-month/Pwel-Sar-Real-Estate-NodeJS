import passport from "passport";
import "modules/user/api/strategies/passport-local";

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, "user");
});
