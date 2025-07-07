import { AuthRepository } from "modules/user/infrastructures/repositories/AuthRepository";
import { Strategy as LocalStrategy } from "passport-local";
import { AppError, errorKinds } from "../../../../utils/error-handling";

import passport from "passport";
import bcrypt from "bcrypt";

const authRepository = new AuthRepository();

export default passport.use(
	new LocalStrategy(
		{ usernameField: "email", passwordField: "password" },
		async (email: string, password: string, done: any) => {
			try {
				const user = await authRepository.findByEmail(email);
				if (!user)
					throw AppError.new(
						errorKinds.invalidCredential,
						"User not found."
					);

				const isMatch = await bcrypt.compare(password, user.password);

				if (!isMatch)
					throw AppError.new(
						errorKinds.invalidCredential,
						"Incorrect password."
					);
				done(null, user);
			} catch (err) {
				done(err);
			}
		}
	)
);
