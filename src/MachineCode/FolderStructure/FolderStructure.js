import React from "react";

import { STRUCTURE } from "./folderStructure.constants";
import Container from "./Container";

const FolderStructure = () => {
  return (
    <>
      <h1>Folder Structure</h1>
      <Container structure={STRUCTURE} />
    </>
  );
};

export default FolderStructure;
