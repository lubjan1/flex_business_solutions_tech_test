import { faker } from '@faker-js/faker';

const jobStatuses = [
  { name: "Completed", id: 1, code: "completed" },
  { name: "On Hold", id: 2, code: "on_hold" },
  { name: "In Progress", id: 3, code: "in_progress" }
];

const jobCategories = [
  { name: "Sidewalk Shed", code: '1' },
  { name: "Scaffold", code: '2' },
  { name: "Shoring", code: '3' }
];

let idCounter = 0;

const generateUniqueId = () => {
  return idCounter++;
}
const generateItems = (numItems = 5) => {
  const items = [];

  for (let i = 0; i < numItems; i += 1) {
    const itemName = faker.commerce.productName();
    const quantity = faker.datatype.number({ min: 1, max: 100 });
    const description = faker.commerce.productAdjective();
    const notes = faker.lorem.sentence();

    items.push({
      id: generateUniqueId(),
      itemName,
      quantity,
      description,
      notes 
    });
  }

  return items;
}


function generateJob(numJobs = 1) {
  const newJobs = [];

  for (let i = 0; i < numJobs; i += 1) {
    const nameJob = faker.random.words();
    const status = faker.helpers.arrayElement(jobStatuses);
    const category = faker.helpers.arrayElement(jobCategories);
    const items = generateItems(faker.datatype.number({ min: 1, max: 10 }));

    newJobs.push({
      nameJob,
      status,
      category,
      id: generateUniqueId(),
      items
    });
  }
  return newJobs;
}

export { jobCategories, jobStatuses, generateJob as default };
