import authReducer, { actions, TInitialState } from "./auth-reducer";

let state: TInitialState;

beforeEach(() => {
  state = {
    isAuth: false,
    id: null ,
    login: null, 
    email: null, 
    captcha: null, 
    name: null, 
    photoSmall: null, 
  };
});

it("name should be added", () => {
    const action = actions.setName("Vitalic");
    const newState = authReducer(state, action);
    expect(newState.name).toBe("Vitalic");
});
