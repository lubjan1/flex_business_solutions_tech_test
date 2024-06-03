import { create } from "zustand";
import generateJob from "./generateJob";


export const useJobsStore = create((set) => ({
    jobs: generateJob(20),
    set,
  }));