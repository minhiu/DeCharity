import React from "react";
import { Dropdown } from "semantic-ui-react";
import { categories } from "../constants/categories";

const DropdownFilter = (props) => {
  const renderLabel = (label) => ({
    color: "blue",
    content: `${label.text}`,
  });

  return (
    <Dropdown
      className="dropdown-filter"
      multiple
      selection
      fluid
      options={categories}
      placeholder="Filter by Category"
      renderLabel={renderLabel}
      onChange={props.onFilterChange}
    />
  );
};

export default DropdownFilter;
