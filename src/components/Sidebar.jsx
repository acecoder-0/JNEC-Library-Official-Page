import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar" style={{backgroundColor: '#d7cdc3', padding: '20px'}}>
      <h5 style={{color: '#703c19', textAlign: 'center', textDecoration: 'underline'}}><strong>LATEST NEWS</strong></h5>
      <hr />
      <div style={{height: '200px', overflow: 'hidden'}}>
        <marquee behavior="scroll" direction="up" scrollAmount="2" style={{color: '#000'}}>
          From 19th Oct., 2015 P. L. Book Issue has been Started......From 26th October Reading Room Will be Open from 10.00 A. M. Morning to 12.00 A.M. Midnight Trail Access of World eBook Library started please use for Engineering Related E-Books .............
        </marquee>
      </div>
      <hr />
      <h5 style={{color: '#703c19', textAlign: 'center', textDecoration: 'underline'}}><strong>QUICK LINKS</strong></h5>
      <hr />
      <ul style={{color: '#000', listStyleType: 'none', padding: 0}}>
        <li><Link to="/ulfs" style={{color: '#000'}}>Useful Links for Students</Link></li>
<li><Link to="/e-news-papers" style={{color: '#000'}}>E - News Papers</Link></li>
        <li><Link to="/ask-librarian" style={{color: '#000'}}>Ask A Librarian Service</Link></li>
        <li><Link to="/new-arrival-books" style={{color: '#000'}}>New Arrivals- Books</Link></li>
        <li><Link to="/feedback" style={{color: '#000'}}>Library Feedback Form</Link></li>
        <li><Link to="/journals" style={{color: '#000'}}>New Arrivals- Journals</Link></li>
        <li><Link to="/question-papers" style={{color: '#000'}}>Preparation-Question Paper's</Link></li>
        <li><a href="/public/books cds record.pdf" target="_blank" style={{color: '#000'}}>List of Book CDs</a></li>
        <li><Link to="/faq" style={{color: '#000'}}>FAQ's about Library</Link></li>
        <li><Link to="/gallery" style={{color: '#000'}}>Image Gallery</Link></li>
        <li><Link to="/e-resources" style={{color: '#000'}}>E-Resources</Link></li>
        <li><Link to="/lib-rules" style={{color: '#000'}}>Lib Rules</Link></li>
      </ul>
      <hr />
    </div>
  );
};

export default Sidebar;
