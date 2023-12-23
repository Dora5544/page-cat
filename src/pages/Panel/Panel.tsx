import React, { useEffect } from 'react';
import { useActivePageChange } from '../../hooks/use-active-page-change-hook';
import './Panel.css';

const Panel: React.FC = () => {

  const page = useActivePageChange();

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
