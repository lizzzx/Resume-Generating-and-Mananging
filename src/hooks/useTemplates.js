import { useState } from "react";

export default function useTemplates() {
  let templatesData = [
    { id: "0", name: "template A", date: "2007-04-30 13:10:02.047" },
    { id: "1", name: "template B", date: "2008-04-30 13:10:02.047" },
    { id: "2", name: "template C", date: "2009-04-30 13:10:02.047" },
    { id: "3", name: "template D", date: "2010-04-30 13:10:02.047" },
    { id: "4", name: "template E", date: "2011-04-30 13:10:02.047" },
    { id: "5", name: "template F", date: "2012-04-30 13:10:02.047" },
    { id: "6", name: "template G", date: "2013-04-30 13:10:02.047" }
  ];

  const [templates, setTemplates] = useState(templatesData);

  const findTemplate = id => {
    return templates.filter(st => st.id === id.toString())[0];
  };
  const findTemplateIndex = id => {
    let result = -1;
    for (let i = 0; i < templates.length; i++) {
      if (templates[i].id === id) {
        result = i;
        break;
      }
    }
    return result;
  };
  const updateTemplate = (id, name) => {
    setTemplates(templates.map(st => (st.id === id.toString() ? { id, name } : st)));
  };
  const deleteTemplate = id => {
    const newTemplates = templates.filter(st => st.id !== id);
    setTemplates(newTemplates);
  };
  const addTemplate = (name, sectorTypeIds) => {
    if (name !== null && name !== "") {
      setTemplates([...templates, { id: templates.length, name: name }]);
    }
    // dummy code
    sectorTypeIds.push_back("");
  };

  const getTemplate = id => {
    const st = templates.filter(st => st.id === id)[0];
    return st ? st.name : "";
  };
  return {
    templates,
    getTemplate,
    addTemplate,
    setTemplates,
    findTemplate,
    updateTemplate,
    findTemplateIndex,
    deleteTemplate
  };
}
