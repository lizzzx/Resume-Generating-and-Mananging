import { faker } from "@faker-js/faker";
import { add } from "date-fns";

const educations = [...Array(3)].map((_, index) => ({
  duplicatedSectorID: faker.datatype.uuid(),
  duplicatedSectorName: faker.company.companyName(),
  duplicatedSectorTypeID: faker.datatype.bigInt(),
  duplicatedSectorModifiedDate: add(new Date(), { days: index, hours: index }),
  duplicatedSectorTypeName: "education"
}));

export default educations;
