import { useState } from "react";

export default function useSectorTypeAttributes(id) {
  // Create a custom React Hook
  const attributesData = [
    { stid: "1", id: "0", name: "School", required: true },
    { stid: "1", id: "1", name: "Degree", required: false },
    { stid: "1", id: "2", name: "Field of Study", required: true },
    { stid: "1", id: "3", name: "Grade", required: true },
    { stid: "1", id: "4", name: "Description", required: true }
  ];

  // temp data, will be replaced by call to backend
  const filteredAttributes = attributesData.filter(a => a.stid === id);

  const [attributes, setAttributes] = useState(filteredAttributes);

  const findAttribute = (stid, id) => {
    return attributes.filter(
      a => a.stid === stid.toString() && a.id === id.toString()
    )[0];
  };
  const findAttributeIndex = (stid, id) => {
    let result = -1;
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].stid === stid && attributes[i].id === id) {
        result = i;
        break;
      }
    }
    return result;
  };

  //is required here bool or string??
  const updateAttribute = (stid, id, name, required) => {
    setAttributes(
      attributes.map(a =>
        a.stid === stid.toString() && a.id === id.toString
          ? { stid, id, name, required }
          : a
      )
    );
  };
  const deleteAttribute = (stid, id) => {
    setAttributes(attributes.filter(a => a.id !== id && a.stid === stid));
  };
  const addAttribute = ({ name, required }) => {
    if (name !== null && name !== "") {
      // temp id; will be replaced by id received from backend
      // should we add check for redundant name???
      let tempId = attributes.length;
      setAttributes([...attributes, { tempId, name, required }]);
      return tempId;
    }
  };

  const getAttributes = () => {
    return attributes;
  };

  return {
    attributes,
    getAttributes,
    addAttribute,
    setAttributes,
    findAttribute,
    updateAttribute,
    findAttributeIndex,
    deleteAttribute
  };
}
