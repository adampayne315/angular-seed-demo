import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Vassal {
  id: string;
  name: string;
}

interface Realm {
  id: string;
  x: number;
  y: number;
  monarch: string;
  vassals: Vassal[];
}

const App: React.FC = () => {
  const [realms, setRealms] = useState<Realm[]>([]);

  useEffect(() => {
    fetchRealms();
  }, []);

  const fetchRealms = async () => {
    const response = await axios.get<Realm[]>('/api/realms');
    setRealms(response.data);
  };

  return (
    <div>
      <h1>Realm Manager</h1>
      <ul>
        {realms.map((realm) => (
          <li key={realm.id}>
            <strong>{realm.monarch}</strong> (X: {realm.x}, Y: {realm.y}) - Vassals:{' '}
            {realm.vassals.map((v) => v.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;