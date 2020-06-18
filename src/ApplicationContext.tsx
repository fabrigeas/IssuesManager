import React from "react";
import settings, { settingsType } from "./AppSettings";
import { baseUrl, writeCookie, getCookie } from "./gateway.service";
import { UserType } from "./components/User/User.model";

export type ApplicationContextType = {
  settings: settingsType;
  secureHttpRequest: (props: FetchParams) => Promise<any>,
  user?: UserType,
  actualizeUser: (user: UserType) => void,
};

export interface FetchParams {
  method?: string;
  url: string;
  body?: any;
  fullPath?: string;
}

export const secureHttpRequest = async({
  url,
  method = "GET",
  body,
  fullPath,
}: FetchParams) : Promise<any> => {

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const path = fullPath || `${baseUrl}secure/${url}`;
  let accessToken = getCookie("access-token");

  if (accessToken) {
    headers["access-token"] = accessToken;
  } else {
    alert("Your session has expired");
    window.location.href = "/sign-in";
    return Promise.reject({
      message: "Your session has expired. Please sign in again",
    });
  }

  const response = await fetch(path, {
    headers,
    method: method ? method : body?.id ? "PUT" : "POST",
    body: JSON.stringify(body),
  });

  accessToken = response.headers.get("access-token") || undefined;

  const expirationDate = response.headers.get("expirationDate") || undefined;

  if (accessToken && expirationDate) {
    writeCookie(
      "access-token",
      accessToken,
      new Date(expirationDate).toUTCString()
    );
  }
  
  const json = await response.json();
  return json.error ? Promise.reject(json) : Promise.resolve(json);
}

export default React.createContext<ApplicationContextType>({
  settings,
  secureHttpRequest,
  actualizeUser: console.log
});
