import { faker } from "@faker-js/faker";
import { add } from "date-fns";

const paWorkspaces = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  resumeName: faker.company.companyName(),
  date: add(new Date(), { days: index, hours: index })
}));

export default paWorkspaces;
