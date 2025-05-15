import { useCallback, useMemo, useReducer } from 'react';

type TAction = {
  name: string;
  value: string;
};

const reducer = <T extends Record<string, string>>(
  state: T,
  action: TAction | null,
) => {
  if (!action) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const initialState: any = {};
    Object.keys(state).forEach((key) => {
      initialState[key] = '';
    });
    return initialState;
  }

  return {
    ...state,
    [action.name]: action.value,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useInputs = <T extends Record<string, any>>(defaultValues: T) => {
  const memoValues = useMemo(() => defaultValues, [defaultValues]);
  const [inputs, dispatch] = useReducer(reducer, memoValues);

  const onChangeValue = useCallback(
    (e: { target: { name: string; value: string } }) => {
      dispatch({
        name: e.target.name,
        value: e.target.value,
      });
    },
    [],
  );

  const onReset = () => {
    dispatch(null);
  };

  return { inputs, onChangeValue, onReset, dispatch } as {
    inputs: T;
    onChangeValue: typeof onChangeValue;
    onReset: typeof onReset;
    dispatch: typeof dispatch;
  };
};

export default useInputs;
