import { faker } from '@faker-js/faker';

const jobStatuses = [
  { name: "Completed", id: 1,code:"completed" },
  { name: "On Hold", id: 2,code:"on_hold" },
  { name: "In Progress", id: 3,code:"in_progress" }
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

function generateJob(numJobs = 1) {
  const newJobs = [];

  for (let i = 0; i < numJobs; i += 1) {
    const nameJob = faker.random.words();
    const status = faker.helpers.arrayElement(jobStatuses);  
    const category = faker.helpers.arrayElement(jobCategories);  

    newJobs.push({
      nameJob,
      status,
      category,
      id: generateUniqueId()
    });
  }
  return newJobs;
}

export { jobCategories, jobStatuses, generateJob as default };
