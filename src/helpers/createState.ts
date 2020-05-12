import { useEffect, useReducer } from "react";

export function createState<V>(initial: V) {
  let state = initial;
  let listeners: Array<() => void> = [];

  return {
    get: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [, rerender] = useReducer(x => !x, false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        listeners.push(rerender);
        return () => {
          listeners = listeners.filter(l => l !== rerender);
        };
      }, []);

      return state;
    },
    set: (v: V) => [(state = v), listeners.forEach(l => l())]
  };
}
