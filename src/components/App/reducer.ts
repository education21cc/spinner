
export const initialState: [number, number, number] = [0, 0, 0];

type Action =
 | { type: 'updateRing0', index: number }
 | { type: 'updateRing1', index: number }
 | { type: 'updateRing2', index: number }

export const reducer = (state: [number, number, number], action: Action) => {
  switch (action.type) {
    case 'updateRing0':
      return Object.assign(initialState, state, { 0: action.index });
    case 'updateRing1':
      return Object.assign(initialState, state, { 1: action.index });
    case 'updateRing2':
      return Object.assign(initialState, state, { 2: action.index });
  }
}
  