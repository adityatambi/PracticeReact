import { useEffect, useState, useMemo } from 'react';
import { getPerson } from './getPerson';

export function PersonScore() {
  const [name, setName] = useState<string | undefined>();
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  function sillyExpensiveFunction() {
    console.log('Executing silly expensive function');

    let sum = 0;
    for (let i = 0; i < 10000; i++) {
      sum += i;
    }
    return sum;
  }

  useEffect(() => {
    getPerson().then((person) => {
      setLoading(false);
      setName(person.name);
      console.log('state value', loading, name, score);
    });
  }, [name, score]);
  const sillyExpensiveCalculation = useMemo(() => sillyExpensiveFunction(), []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3>
        {name}, {score}
      </h3>
      <p>{sillyExpensiveCalculation}</p>
      <button onClick={() => setScore(score + 1)}>Add</button>
      <button onClick={() => setScore(score - 1)}>Subtract</button>
      <button onClick={() => setScore(0)}>Reset</button>
    </div>
  );
}
