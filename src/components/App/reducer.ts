
export const initialState: [string, string, string] = ["", "", ""];

type Action =
 | { type: 'updateRing0', value: string }
 | { type: 'updateRing1', value: string }
 | { type: 'updateRing2', value: string }

export const reducer = (state: [string, string, string], action: Action) => {
  switch (action.type) {
    case 'updateRing0':
      return Object.assign(initialState, state, { 0: action.value });
    case 'updateRing1':
      return Object.assign(initialState, state, { 1: action.value });
    case 'updateRing2':
      return Object.assign(initialState, state, { 2: action.value });
  }
}
  