import { Admin, Resource } from 'react-admin';
import { NhostProvider } from '@nhost/react';
import nhost from './config/nhost';
import GlobalList from './resources/list/globalResources';
//import DataList from './resources/list/dataRessources';

const App = () => {
  return (
    <NhostProvider nhost={nhost}>
      <Admin >
        <Resource
          name='Global'
          list={GlobalList}
        />
        {/* <Resource
            name='Comparatif'
            list={DataList}
        />  */}
      </Admin>
    </NhostProvider>
  );
};

export default App;