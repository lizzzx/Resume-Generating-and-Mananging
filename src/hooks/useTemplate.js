import { useState } from "react";
import useSectorTypes from "./useSectorTypes";

export default function useTemplate(tid) {
  // Create a custom React Hook
  const sectorTypesData = [
    { tid: "0", id: "1", name: "Education" },
    { tid: "0", id: "2", name: "Projects" },
    { tid: "0", id: "3", name: "Technical Skills" },
    { tid: "0", id: "5", name: "Summary" },
    { tid: "1", id: "4", name: "Volunteer Experience" },
    { tid: "1", id: "0", name: "Work Experience" }
  ];

  const { findSectorType } = useSectorTypes();

  // temp data, will be replaced by call to backend
  const filteredSectorTypes = sectorTypesData.filter(a => a.tid === tid);

  const [sectorTypes, setSectorTypes] = useState(filteredSectorTypes);

  const findTemplateSectorType = (tid, id) => {
    return sectorTypes.filter(
      st => st.tid === tid.toString() && st.id === id.toString()
    )[0];
  };

  const findTemplateSectorTypeIndex = (tid, id) => {
    let result = -1;
    for (let i = 0; i < sectorTypes.length; i++) {
      if (sectorTypes[i].tid === tid && sectorTypes[i].id === id) {
        result = i;
        break;
      }
    }
    return result;
  };

  const deleteTemplateSectorType = (tid, id) => {
    setSectorTypes(sectorTypes.filter(st => st.id !== id && st.tid === tid));
  };
  const addTemplateSectorType = id => {
    const sectorType = findSectorType(id);
    if (sectorType !== undefined) {
      // should we add check for redundant name???
      setSectorTypes([...sectorTypes, sectorType]);
    }
  };

  const getTemplateSectorTypes = () => {
    return sectorTypes;
  };

  return {
    getTemplateSectorTypes,
    addTemplateSectorType,
    setSectorTypes,
    findTemplateSectorType,
    findTemplateSectorTypeIndex,
    deleteTemplateSectorType
  };
}
