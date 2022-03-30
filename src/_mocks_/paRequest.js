import { faker } from "@faker-js/faker";
import { sample } from "lodash";

const requests = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.company.companyName(),
  targetEmployee: faker.name.findName(),
  status: sample(["submitted", "pending"])
}));

export default requests;
