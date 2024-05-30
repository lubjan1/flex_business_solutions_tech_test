import { faker } from '@faker-js/faker';

const jobStatuses = [
  { name: "Completed", code: 1 },
  { name: "On Hold", code: 2 },
  { name: "In Progress", code: 3 }
];

const jobCategories = [
  { name: "Sidewalk Shed", code: '1' },
  { name: "Scaffold", code: '2' },
  { name: "Shoring", code: '3' }
];

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
    });
  }
  return newJobs;
}

export { jobCategories, jobStatuses, generateJob as default };
