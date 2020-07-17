import React, { useState, useContext } from "react";
import search from "../assets/search.svg";
import { toHexColor } from "../util";
import { AuthContext } from "../App";
function SearchBar(props) {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState([]);

  const { state, dispatch } = useContext(AuthContext);
  const handleOnChange = (e) => {
    // TODO: perhaps break at new tags? actually use query?
    setInputValue(e.target.value);
  };

  const { selectedFilter } = state;
  const changeSelectedFilter = (newFilter) => {
    dispatch({
      type: "FILTER",
      payload: { selectedFilter: newFilter },
    });
  };

  const tags = query.map((tag, i) => {
    const text = tag.substring(1);
    return (
      <span
        key={i}
        className="tag"
        style={{ backgroundColor: toHexColor(text) }}
      >
        {tag}
      </span>
    );
  });

  return (
    <section>
      <div className="search">
        {tags}
        <input
          value={inputValue}
          placeholder="Search by title or by tags by prepending #..."
          onChange={handleOnChange}
          onKeyUp={() => props.setFilter(inputValue)}
        />
        <img
          src={search}
          className="search-btn"
          onClick={() => props.setFilter(inputValue)}
        />
      </div>
      <ul className="menu-list">
        <li
          className={selectedFilter === "explore" ? "" : "not-selected"}
          onClick={() => changeSelectedFilter("explore")}
        >
          Explore
        </li>
        <li
          className={selectedFilter === "dashboard" ? "" : "not-selected"}
          onClick={() => changeSelectedFilter("dashboard")}
        >
          Dashboard
        </li>
        <li
          className={selectedFilter === "contacts" ? "" : "not-selected"}
          onClick={() => changeSelectedFilter("contacts")}
        >
          Contacts
        </li>
      </ul>
    </section>
  );
}

export default SearchBar;
