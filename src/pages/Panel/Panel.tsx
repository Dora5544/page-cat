import React, { useEffect } from 'react';
import { useActiveTabChange } from '../../hooks/browser-listener-hook';
import './Panel.css';

const Panel: React.FC = () => {

  const page = useActiveTabChange();

  useEffect(() => {
    console.log('here', page)
  }, [page])

  return (
    <div>
      <div style={{ height: '80vh', overflowY: 'auto' }}>
        <h1>You are visiting {page?.title}</h1>
        {/* <Chat></Chat> */}
      </div>
    </div>
  );
};

export default Panel;
