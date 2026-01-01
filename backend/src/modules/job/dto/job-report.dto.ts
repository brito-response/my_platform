export interface JobLevelStats {
  level: string;
  count: number;
  averageBudget: number;
}

export interface JobsData {
  totalJobs: number;
  totalCompletedJobs: number;
  jobsByLevel: JobLevelStats[];
  averageProposalsPerJob: number;
}