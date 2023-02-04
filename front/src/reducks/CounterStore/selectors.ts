import type { RootState } from 'src/reducks/store/store';

export const selectCount = (state: RootState) => {
  return state.counter.value;
};
