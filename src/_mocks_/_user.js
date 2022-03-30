import { faker } from "@faker-js/faker";

// ----------------------------------------------------------------------

const roles = ["Employee", "Project Administrator", "System Administrator"];

const userList = [...Array(10)].map(() => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.phoneNumber(),
  role: roles[faker.datatype.number() % 3]
}));

export default userList;
