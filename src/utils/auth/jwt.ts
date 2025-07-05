import jwt from "jsonwebtoken";
import { privateKey, publicKey } from "./key";


export const signJwt = (payload: Object, options?: jwt.SignOptions) => {
  return jwt.sign(payload, privateKey, {
    ...options,
    algorithm: "RS256",
  });
};

export const verifyJwt = (token: string) => {
  try {
    return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
  } catch (error) {
    return null;
  }
};
