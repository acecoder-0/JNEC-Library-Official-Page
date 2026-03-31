import React from 'react';
import { Container } from 'react-bootstrap';

const MainContent = () => {
  return (
    <iframe 
      src="https://library.jnec.org/data-index.php" 
      width="100%" 
      height="950px"
      style={{border: 'none'}}
      title="Library Data"
    />
  );
};

export default MainContent;
