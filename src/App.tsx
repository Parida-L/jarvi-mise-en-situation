import { Admin, Resource } from 'react-admin';
import { NhostProvider } from '@nhost/react';
import GlobalList from './resources/data/Global';
import DataList from './resources/data/List';
import nhost from './config/nhost';

const App = () => {
  return (
    <NhostProvider nhost={nhost}>
      <Admin >
        <Resource
          name='Comparatif'
          list={DataList}
        />
        <Resource
          name='Global'
          list={GlobalList}
        />
      </Admin>
    </NhostProvider>
  );
};

export default App;