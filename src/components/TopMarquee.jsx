import React from 'react';

const TopMarquee = () => {
  return (
    <div style={{
      backgroundColor: '#703c19',
      height: '35px',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }}>
      <marquee behavior="scroll" direction="left" scrollAmount="4" style={{color: '#FFF', marginTop: '5px', marginBottom: '10px', fontSize: '14px', fontWeight: 'bold'}}>
        *** <img src="/images/NewAlt.gif" alt="New" width="71" height="32" style={{verticalAlign: 'middle'}} /> List of Suggested Engineering Books of Indian Authors & Publishers- <a href="#" style={{color: '#FFF'}}>list-suggested-books-indian-authors-publishers.pdf</a> &nbsp; QUOTES : ONE BEST BOOK IS EQUAL TO HUNDRED GOOD FRIENDS BUT ONE GOOD FRIEND IS EQUAL TO A LIBRARY. - Dr. A.P.J ABDUL KALAM &nbsp; "LIBRARIES ARE THE FOUNDATIONS FOR LEARNING ." - MARK DAVIS &nbsp; "I HAVE ALWAYS IMAGINED THAT PARADISE WILL BE A KIND OF LIBRARY - JORGE LUIS BORGES (1899-1986)
      </marquee>
    </div>
  );
};

export default TopMarquee;
