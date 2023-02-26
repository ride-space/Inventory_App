import type { RootState } from 'src/store';

export const selectCount = (state: RootState) => {
  return state.counter.value;
};
