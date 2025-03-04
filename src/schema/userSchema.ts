import { Type as t } from "@sinclair/typebox";

// Schema validasi untuk user
export const UserRegisterSchema = t.Object({
  name: t.String({
    minLength: 4,
    maxLength: 50,
  }),
  username: t.String({
    minLength: 2,
    maxLength: 50,
  }),
  email: t.String({
    format: "email",
    minLength: 6,
    maxLength: 50,
  }),
  password: t.String({
    minLength: 4,
    maxLength: 50,
  }),
});
