import { useState } from "react";

export default function useSectorTypes() {
  // Create a custom React Hook
  let sectorTypesData = [
    { id: "0", name: "Work Experience" },
    { id: "1", name: "Education" },
    { id: "2", name: "Projects" },
    { id: "3", name: "Technical Skills" },
    { id: "4", name: "Volunteer Experience" },
    { id: "5", name: "Summary" },
    { id: "6", name: "TEST1" },
    { id: "7", name: "TEST2" },
    { id: "8", name: "TEST3" },
    { id: "9", name: "TEST" }
  ];

  const [sectorTypes, setSectorTypes] = useState(sectorTypesData);

  const findSectorType = id => {
    return sectorTypes.filter(st => st.id === id.toString())[0];
  };
  const findSectorTypeIndex = id => {
    let result = -1;
    for (let i = 0; i < sectorTypes.length; i++) {
      if (sectorTypes[i].id === id) {
        result = i;
        break;
      }
    }
    return result;
  };
  const updateSectorType = (id, name) => {
    setSectorTypes(
      sectorTypes.map(st => (st.id === id.toString() ? { id, name } : st))
    );
  };
  const deleteSectorType = id => {
    const newSectorTypes = sectorTypes.filter(st => st.id !== id);
    setSectorTypes(newSectorTypes);
  };
  const addSectorType = (name, attributes) => {
    if (name !== null && name !== "") {
      // temp id; will be replaced by id received from backend
      setSectorTypes([...sectorTypes, { id: sectorTypes.length, name: name }]);
      // dummy code
      attributes.push_back("");
    }
  };

  const getSectorType = ({ id }) => {
    const st = sectorTypes.filter(st => st.id === id)[0];
    return st ? st.name : "";
  };
  return {
    sectorTypes,
    getSectorType,
    addSectorType,
    setSectorTypes,
    findSectorType,
    updateSectorType,
    findSectorTypeIndex,
    deleteSectorType
  };
}
