import { MESSAGES } from "../utils/constants";

export const validateJSON = (_: unknown, value: string) => {
  try {
    if (value) JSON.parse(value);
    return Promise.resolve();
  } catch {
    return Promise.reject(new Error(MESSAGES.RESPONSE_INVALID));
  }
};

export const urlRules = [
  { required: true, message: MESSAGES.URL_REQUIRED },
  { pattern: /^https?:\/\/.+/, message: MESSAGES.URL_INVALID },
];

export const responseRules = [
  { required: true, message: MESSAGES.RESPONSE_REQUIRED },
  { validator: validateJSON },
];
