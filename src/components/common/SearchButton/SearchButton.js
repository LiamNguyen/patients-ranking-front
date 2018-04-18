import React from 'react';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';

import './style.css';

const SearchButton = ({ onClick }) => (
  <IconButton>
    <Search className="search-icon" onClick={onClick} />
  </IconButton>
);

export default SearchButton;
