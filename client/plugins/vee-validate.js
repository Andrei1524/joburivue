import { required, confirmed, length, email, min } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend("confirmed", {
  ...confirmed,
  message: "This field confirmation does not match"
});

extend("password", {
  ...min,
  message: "Password Must Be at Least 8 Characters"
});

extend("min", {
  ...min,
  message: "Must Be at Least 8 Characters"
});

extend("length", {
  ...length,
  message: "This field must have 2 options"
});
