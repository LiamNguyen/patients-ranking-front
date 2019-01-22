export default function createReducer(getInitialState, handlers) {
  return (state = getInitialState(), action = null) => {
    const changes = handlers[action.type]
      ? handlers[action.type](state, action)
      : {};
    return { ...state, ...changes };
  };
}
