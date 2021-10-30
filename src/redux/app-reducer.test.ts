import appReducer, { actions } from "./app-reducer";

it("isInitialized must be set to true", () => {
  const state: TState = {
    isInitialized: false,
  };
  
  const action = actions.initializeSuccess(true);

  const newState = appReducer(state, action);

  expect(newState.isInitialized).toBe(true);
});

// Types

type TState = {
  isInitialized: boolean;
};


