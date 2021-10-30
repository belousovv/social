import { authApi, TLogin } from "../api/api";
import { getAuth, login } from "../redux/auth-reducer";
import { TGetAuth } from "../api/api";
jest.mock("../api/api");

const apiMock = authApi as jest.Mocked<typeof authApi>;

let dispatchMock = jest.fn();
let getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});

test("thunk getAuth should run dispatches 3 times", async () => {
  const result: TGetAuth = {
    resultCode: 0,
    messages: [],
    data: { id: 0, email: "www.test", login: "login" },
  };
  apiMock.getAuth.mockReturnValue(Promise.resolve(result));
  const thunk = getAuth();
  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(2);
});

test("thunk login should run dispatch 1 time", async () => {
  const result: TLogin = {
    resultCode: 0,
    messages: [],
    data: { userId: 0 },
  };
  apiMock.login.mockReturnValue(Promise.resolve(result));
  const thunk = login("email", "pswd", false, "captcha");
  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(1);
});
