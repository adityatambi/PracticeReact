import { useEffect, useReducer, useRef } from 'react';
import { getPerson } from './getPerson';

type State = {
  name: string | undefined;
  score: number;
  loading: boolean;
};

type Action =
  | {
      type: 'initialize';
      name: string;
    }
  | {
      type: 'increment';
    }
  | {
      type: 'decrement';
    }
  | {
      type: 'reset';
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'initialize':
      return { name: action.name, score: 0, loading: false };

    case 'increment':
      return { ...state, score: state.score + 1 };

    case 'decrement':
      return { ...state, score: state.score - 1 };

    case 'reset':
      return { ...state, score: (state.score = 0) };

    default:
      return state;
  }
}

export function PersonScoreuseReducer() {
  const [{ name, score, loading }, dispatch] = useReducer(reducer, {
    name: undefined,
    score: 0,
    loading: true,
  });

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const subtractButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getPerson().then(({ name }) => dispatch({ type: 'initialize', name }));
  }, []);

  useEffect(() => {
    if (!loading) {
      addButtonRef.current?.focus();
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      subtractButtonRef.current?.focus();
    }
  }, [loading]);

  if (loading) {
    return <div>...LOading</div>;
  }

  return (
    <div>
      <h3>
        {name}, {score}
      </h3>
      <button onClick={() => dispatch({ type: 'increment' })} ref={addButtonRef}>
        Add
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })} ref={subtractButtonRef}>
        Subtract
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
