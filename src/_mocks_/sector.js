import { faker } from "@faker-js/faker";
import { sample } from "lodash";
import { add } from "date-fns";

const sectors = [...Array(24)].map((_, index) => ({
  sectorID: faker.datatype.uuid(),
  sectorName: faker.company.companyName(),
  sectorTypeID: faker.datatype.bigInt(),
  sectorModifiedDate: add(new Date(), { days: index, hours: index }),
  sectorTypeName: sample(["education", "project", "summary", "justification"])
}));

export default sectors;
