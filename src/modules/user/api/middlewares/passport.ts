import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { AuthRepository } from "modules/user/infrastructures/repositories/auth/AuthRepository";
import * as bcrypt from "bcrypt";

const authRepository = new AuthRepository();

passport.use(
	new LocalStrategy(
		{ usernameField: "email", passwordField: "password" },
		async (email, password, done) => {
			try {
				const user = await authRepository.findByEmail(email);
				if (!user)
					return done(null, false, { message: "Incorrect email." });
				// @ts-ignore
				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch)
					return done(null, false, {
						message: "Incorrect password.",
					});
				return done(null, user);
			} catch (err) {
				return done(err);
			}
		}
	)
);

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.ACCESS_TOKEN_PRIVATE_KEY || "secret",
		},
		async (jwtPayload, done) => {
			try {
				const user = await authRepository.findById(jwtPayload.id);
				if (!user) return done(null, false);
				return done(null, user);
			} catch (err) {
				return done(err, false);
			}
		}
	)
);

// Session-based authentication (optional, for completeness)
passport.serializeUser((user: any, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
	try {
		const user = await authRepository.findById(id);
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});

export default passport;
