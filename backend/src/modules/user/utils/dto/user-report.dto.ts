export interface CityStats {
  city: string;
  count: number;
}

export interface StateStats {
  state: string;
  count: number;
}

export interface UsersData {
  totalUsers: number;
  usersByCity: CityStats[];
  usersByState: StateStats[];
  averageHourlyRate: number;
  averageScore: number;
  averageProposalsPerUser: number;
}