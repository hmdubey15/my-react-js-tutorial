<div style="font-size: 17px;background: black;padding: 2rem;">

<b style="color: Chartreuse;">Q:</b> Polyfill for `useEffect`:

<b style="color: Orange;">Ans:</b>

```jsx
import { useRef } from 'react';

export default function useEffectCustom(setup, dependencies) {
  const dependeciesRef = useRef([]);
  const cleanupRef = useRef(null);

  if (typeof setup !== 'function') return;

  const runEffect = () => {
    if (cleanupRef.current) cleanupRef.current();
    const cleanup = setup();
    if (typeof cleanup === 'function') {
      cleanupRef.current = cleanup;
    }
    dependeciesRef.current = dependencies;
    return;
  };

  if (dependeciesRef.current.length == 0 || !dependencies) runEffect();
  else {
    for (let i = 0; i < dependencies.length; i++) {
      if (!Object.is(dependeciesRef.current[i], dependencies[i])) {
        runEffect();
      }
    }
  }
}
```

<br>
<hr>
<br>

</div>
