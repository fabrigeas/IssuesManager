import { UserType } from "./components/User/User.model";

interface FetchParams {
  service: string;
  body?: any;
  method: string;
  url?: string;
}

/** Metadata to pass to backend with instructions on how to handle the uploaded file */
export interface FileUploadParams {
  type: string;
  key: string;
  id: string;
}

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? // "http://54.93.50.24:3001/api/"
      "http://localhost:3001/api/"
    : "/api/";

// global request for headers
const headers: Record<string, string> = {
  "Content-Type": "application/json",
};

/** Make a HTTP request */
export const httpRequest = ({
  service,
  body,
  method,
  url,
}: FetchParams): Promise<any> => {
  const path = url || `${baseUrl}${service}`;
  return fetch(path, {
    headers,
    method: method ? method : body?.id ? "PUT" : "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => Promise.resolve(data))
    .catch((error) => Promise.reject(error));
};

/** Read a cookie entry from the cookies
 */
export const getCookie = (name: string): string | undefined => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    )
  );

  if (matches) {
    const val = matches[1].toString();

    if (
      val === String(undefined) ||
      val === String(null) ||
      val === String(NaN)
    ) {
      return undefined;
    }
    return val;
  } else {
    return undefined;
  }
};

/** Add an entry to the cookies. This can be retrived using @readCookie
 */
export const writeCookie = (
  name: string,
  value: string,
  expirationDate?: string | Date
): boolean => {
  const data = value || JSON.stringify(value);
  const expiresIn = expirationDate
    ? new Date(expirationDate).toUTCString()
    : null;

  let cookie = `${name}=${data}; expires=${expiresIn}; path=/;`;

  if (
    !value ||
    value === String(null) ||
    value === String(undefined) ||
    value === String(NaN)
  ) {
    // document.cookie = `${name}=; Max-Age=-1`;
    document.cookie = `${name}=; expires=${new Date().toUTCString()} ;path=/`;
    eraseCookie(name);

    return false;
  } else {
    document.cookie = cookie;
    return true;
  }
};

/** Delete an entry from the document.cookies
 */
export const eraseCookie = (name: string): void => {
  document.cookie = `${name}=; Max-Age=-1;`;
};

/** Make a GET request to check that key:value pair is still available
 *
 * @param key
 * @param value
 */
export const checkAvailability = (
  key: string,
  value: string
): Promise<Boolean> =>
  httpRequest({
    service: `users.checkAvailability?${key}=${value}`,
    method: "GET",
  });

/**
 *
 * @param file
 * @param props
 */
export const uploadFile = async (
  file: File,
  props: FileUploadParams
): Promise<any> => {
  const body = new FormData();

  body.append("file", file);

  const accessToken = getCookie("access-token");

  if (!accessToken) {
    // alert("Your session has expired");
    window.location.href = "/sign-in";
    return;
  }

  return fetch(`${baseUrl}files/upload`, {
    headers: {
      props: JSON.stringify(props),
      "access-token": accessToken,
    },
    method: "POST",
    body,
  })
    .then((response: any) => response.json())
    .then((response: any) => Promise.resolve(response))
    .catch((error: Error) => Promise.resolve(error));
};

export default {

  /** Make a POST request to sign in the user
   */
  signIn: async (user: {
    pseudo: string;
    password: string;
  }): Promise<UserType> =>
    httpRequest({ service: "users.signIn", body: user, method: "POST" })
      .then((result) => {
        const { accessToken, expirationDate, user } = result;

        if (accessToken) {
          writeCookie("access-token", accessToken, expirationDate);
          writeCookie("id", user.id);

          sessionStorage.setItem("user", JSON.stringify(user));

          return Promise.resolve(user);
        }

        return Promise.reject(result);
      })
      .catch((error: Error) => Promise.reject(error)),

  /** Make a httprequest to sign out from the app
   *
   */
  signOut: async (user: UserType): Promise<any> => {
    await httpRequest({ service: "users.signOut", body: user, method: "POST" });
    eraseCookie("access-token");
    eraseCookie("id");

    sessionStorage.clear();
    return true;
  },

  /** Make a GET request to retrive the list of settings
   *
   * @returns {Object}
   */
  getSettings: async () =>
    httpRequest({ service: "settings.findOne", method: "GET" }),

  /** Make a PUT request to save the pririties
   *
   * @returns {Object}
   */
  saveSettings: async (settings: any) =>
    httpRequest({
      service: settings.id ? "settings.update" : "settings.create",
      body: settings,
      method: "PUT",
    }),

  /** Attempt to sign back in with the credentials in the sessionStorage */
  authenticate: (): Promise<UserType> => {
    const accessToken = getCookie("access-token");
    if (accessToken) {
      const data = sessionStorage.getItem("user");

      if (data) {
        const user = JSON.parse(data);
        return Promise.resolve(user);
      }
    }

    sessionStorage.clear();

    return Promise.reject();
  },

  /** Make a PUT request to update the password */
  updatePassword: (user: UserType, password: string): Promise<any> =>
    httpRequest({
      service: `users.updatePassword`,
      method: "PUT",
      body: { user, password },
    }),

  /** Request a password reset link to be emailed to me */
  requestPasswordReset: (email: string): Promise<any> =>
    httpRequest({
      service: `users.requestPasswordReset?email=${email}`,
      method: "GET",
    }),

  /** Make a call to webservice */
  verifyPasswordResetToken: (passwordResetToken: string): Promise<any> =>
    httpRequest({
      service: `users.verifyPasswordResetToken?passwordResetToken=${passwordResetToken}`,
      method: "GET",
    }),
};
