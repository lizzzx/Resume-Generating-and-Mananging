import { faker } from "@faker-js/faker";
import { sample } from "lodash";
import { add } from "date-fns";

const requests = [...Array(24)].map((_, index) => ({
  requestID: faker.datatype.uuid(),
  requestName: faker.company.companyName(),
  requester: faker.name.findName(),
  requestSentTime: add(new Date(), { days: index, hours: index }),
  requestStatus: sample(["todo", "submitted", "rejected"]),
  resumeID: faker.datatype.uuid()
}));

export default requests;
