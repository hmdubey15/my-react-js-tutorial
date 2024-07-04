import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

import "./container.css";

const Container = ({ structure }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleContainerClick = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  return (
    <div className="container">
      <div role="button" onClick={handleContainerClick}>
        {structure.name}
      </div>
      {isOpen && structure.children.map((data) => <Container structure={data} key={data.id} />)}
    </div>
  );
};

Container.propTypes = {
  structure: PropTypes.object.isRequired,
};

export default Container;
