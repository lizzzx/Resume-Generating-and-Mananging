import { useState } from "react";

export default function useExistingSector() {
  let existingSectorsData = [
    { id: "0", name: "Sector A", date: "2007-04-30 13:10:02.047" },
    { id: "1", name: "Sector B", date: "2008-04-30 13:10:02.047" },
    { id: "2", name: "Sector C", date: "2009-04-30 13:10:02.047" },
    { id: "3", name: "Sector D", date: "2010-04-30 13:10:02.047" },
    { id: "4", name: "Sector E", date: "2011-04-30 13:10:02.047" },
    { id: "5", name: "Sector F", date: "2012-04-30 13:10:02.047" },
    { id: "6", name: "Sector G", date: "2013-04-30 13:10:02.047" }
  ];

  const [existingSectors, setExistingSectors] = useState(existingSectorsData);

  const findTemplate = id => {
    return existingSectors.filter(st => st.id === id.toString())[0];
  };
  const findTemplateIndex = id => {
    let result = -1;
    for (let i = 0; i < existingSectors.length; i++) {
      if (existingSectors[i].id === id) {
        result = i;
        break;
      }
    }
    return result;
  };

  const getTemplate = id => {
    const st = existingSectors.filter(st => st.id === id)[0];
    return st ? st.name : "";
  };
  return {
    existingSectors,
    getTemplate,
    setExistingSectors,
    findTemplate,
    findTemplateIndex
  };
}
