import { useState } from "react";

export default function useDivision() {
  let divisionData = [
    { id: "0", name: "Bridge", date: "2007-04-30 13:10:02.047" },
    { id: "1", name: "Electrical", date: "2008-04-30 13:10:02.047" },
    { id: "2", name: "Environmental", date: "2009-04-30 13:10:02.047" },
    { id: "3", name: "Civil", date: "2010-04-30 13:10:02.047" }
  ];

  const [divisions, setDivisions] = useState(divisionData);

  const findDivision = id => {
    return divisions.filter(u => u.id.toString() === id.toString())[0];
  };

  const findDivisionIndex = id => {
    let result = -1;
    for (let i = 0; i < divisions.length; i++) {
      if (divisions[i].id === id) {
        result = i;
        break;
      }
    }
    return result;
  };

  const deleteDivision = id => {
    const newSectorTypes = divisions.filter(u => u.id !== id);
    setDivisions(newSectorTypes);
  };
  const addDivision = name => {
    if (name !== null && name !== "") {
      // temp id; will be replaced by id received from backend
      setDivisions([...divisions, { id: divisions.length, name: name }]);
    }
  };

  return {
    divisions,
    addDivision,
    setDivisions,
    findDivision,
    findDivisionIndex,
    deleteDivision
  };
}
