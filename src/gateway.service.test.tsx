import { expect } from "chai";
import gatewayService, {
  getCookie,
  writeCookie,
  eraseCookie,
} from "./gateway.service";

describe("secureHttpRequest >", () => {
  it("redirects to /sign-in?", async () => {});
});

describe("writeCookie", () => {
  beforeAll(() => {
    deleteAllCookies();
  });

  it("writes document.cookie?", () => {
    const key = "name";
    const value = "fabrigeas";

    const done = writeCookie(key, value);
    const cookies = document.cookie;

    expect(done).to.equal(true);
    expect(cookies.includes(key)).to.equal(true);
    expect(cookies.includes(value)).to.equal(true);
  });

  it("should not save invalid cookies?", () => {
    const key = "name";
    const value = String(null);

    document.cookie = `${name}=; Max-Age=-1;`; //delete it before
    const done = writeCookie(key, value);

    expect(done).to.equal(false);
    expect(document.cookie.includes(key)).to.equal(false);
    expect(document.cookie.includes(value)).to.equal(false);
  });

  it("Should not save 'null'", () => {
    const key = "name";
    const value = String(null);

    document.cookie = `${name}=; Max-Age=-1;`; //delete it before
    expect(document.cookie.includes(key)).to.equal(false);
    expect(document.cookie.includes(value)).to.equal(false);

    const done = writeCookie(key, value);

    expect(done).to.equal(false);
    expect(document.cookie.includes(key)).to.equal(false);
    expect(document.cookie.includes(value)).to.equal(false);
  });

  it("Should not save 'undefined'", () => {
    const key = "name";
    const value = String(undefined);

    document.cookie = `${name}=; Max-Age=-1;`; //delete it before
    expect(document.cookie.includes(key)).to.equal(false);
    expect(document.cookie.includes(value)).to.equal(false);

    const done = writeCookie(key, value);

    expect(done).to.equal(false);
    expect(document.cookie.includes(key)).to.equal(false);
    expect(document.cookie.includes(value)).to.equal(false);
  });

  it("result parsable?", () => {});
});

describe("getCookie", () => {
  it("Should return value", () => {
    const key = "name";
    const value = "fabrigeas";

    document.cookie = `${key}=${value}`;

    expect(getCookie(key)).to.equal(value);
  });

  it("Should return a string", () => {
    const key = "name";
    const value = "fabrigeas";

    document.cookie = `${key}=${value}`;

    const result = getCookie(key);

    expect(result).to.equal(value);
    expect(typeof result).not.to.equal(String(undefined));
  });

  it("Should return undefined", () => {
    const key = "ShouldNotBeCreated";

    document.cookie = `${key}=; Max-Age=-1;`;
    const result = getCookie(key);

    expect(result).to.equal(undefined);
  });

  it("Should return undefined", () => {
    const key = "ShouldNotBeCreated";
    const value = String(null);

    const write = writeCookie(key, value);
    const read = getCookie(key);

    expect(write).to.equal(false);
    expect(read).to.equal(undefined);
  });
});

it("eraseCookie", () => {
  beforeEach(() => deleteAllCookies());
  deleteAllCookies();

  const key = "name";
  const value = "fabrigeas";

  expect(document.cookie.length < 3).to.equal(true);

  document.cookie = `${key}=${value}`;
  expect(document.cookie.includes(key)).to.equal(true);
  expect(document.cookie.includes(value)).to.equal(true);

  eraseCookie(key);
  expect(document.cookie.includes(key)).to.equal(false);
  expect(document.cookie.includes(value)).to.equal(false);
});

const deleteAllCookies = () =>
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
