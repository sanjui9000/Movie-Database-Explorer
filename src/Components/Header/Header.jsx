import React, { useState } from "react";

import "./Header.scss";

import { BsSearch } from "react-icons/bs";
import { AiFillVideoCamera } from "react-icons/ai";

const Header = ({ setSearchTerm, setPageNumber }) => {
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  return (
    <div className="header_search">
      <div className="header">
        {isSearchEnabled ? (
          <div className="search">
            <input
              onChange={(e) => {
                setPageNumber(1);
                setSearchTerm(e.target.value);
              }}
              type="text"
              placeholder="Search movies..."
            />
          </div>
        ) : (
          <>
            <div className="header_icon">
              <a href="/">
                <AiFillVideoCamera size={25} />
              </a>
            </div>
            <div className="header_text">
              <h2>Movie Database</h2>
            </div>
          </>
        )}
        <div className="header_icon">
          <BsSearch
            onClick={() => setIsSearchEnabled(!isSearchEnabled)}
            size={25}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
