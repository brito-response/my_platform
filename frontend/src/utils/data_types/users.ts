export enum TypeUser { ADMIN = 'ADMIN', CLIENT = 'CLIENT', FREELANCER = 'FREELANCER' };

export default interface User {
  userId: string; name: string; email: string; cpf: string; phone: string; photo?: string; bio?: string; country: string; state: string; city: string;
  address: string; skills?: string[]; hourly_rate?: number; score?: number; typeuser: TypeUser; checked?: boolean;
  // Relacionamentos opcionais:
  portifolio?: any; messages?: any[]; contracts?: any[]; reviews?: any[]; proposals?: any[]; payments?: any[]; jobs?: any[];
}

export enum TypeUserStatus { ACTIVE = 'ACTIVE', SUSPENDED = 'SUSPENDED', BANNED = 'BANNED' }

export interface UpdateUserInput {
  photo?: string;
  bio?: string;
  skills?: string[];
  hourly_rate?: number;
  score?: number;
  checked?: boolean;
  userStatus?: TypeUserStatus;
}

export interface CityStatsOut {
  city: string;
  count: number;
}

export interface StateStatsOut {
  state: string;
  count: number;
}

export interface UsersDataOut {
  totalUsers: number;
  usersByCity: CityStatsOut[];
  usersByState: StateStatsOut[];
  averageHourlyRate: number;
  averageScore: number;
  averageProposalsPerUser: number;
}