import { faker } from '@faker-js/faker'

const jobStatuses = [
  { value: "Completed", id: 1 },
  { value: "On Hold", id: 2 },
  { value: "In Progress", id: 3 }
];
const jobCategories = [
  { value: "Sidewalk Shed", id: 1 },
  { value: "Scaffold", id: 2 },
  { value: "Shoring", id: 3 }
];

function generateJob(numJobs = 1) {
  const newJobs = [];

  for (let i = 0; i < numJobs; i += 1) {
    const nameJob = faker.random.words();
    const status = faker.helpers.arrayElement(jobStatuses).value;  
    const category = faker.helpers.arrayElement(jobCategories).value;  

    newJobs.push({
      nameJob,
      status,
      category,
    });
  }

  return newJobs;
}

export default generateJob;