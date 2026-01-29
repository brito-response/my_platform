import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";

export interface ICityStats { city: string; count: number; };
export interface IStateStats { state: string; count: number; };
export interface IUsersData {
  totalUsers: number;
  usersByCity: ICityStats[];
  usersByState: IStateStats[];
  averageHourlyRate: number;
  averageScore: number;
  averageProposalsPerUser: number;
}

// class
export class UsersData {
  totalUsers: number;
  usersByCity: ICityStats[];
  usersByState: IStateStats[];
  averageHourlyRate: number;
  averageScore: number;
  averageProposalsPerUser: number;

  toJSON() {
    return {
      totalUsers: this.totalUsers,
      usersByCity: this.usersByCity,
      usersByState: this.usersByState,
      averageHourlyRate: this.averageHourlyRate,
      averageScore: this.averageScore,
      averageProposalsPerUser: this.averageProposalsPerUser,
    };
  }
}



//dtos
@Exclude()
export class CityStatsDto {
  @Expose()
  @ApiProperty({ example: 'São Paulo' })
  city: string;

  @Expose()
  @ApiProperty({ example: 120 })
  count: number;
}

@Exclude()
export class StateStatsDto {
  @Expose()
  @ApiProperty({ example: 'SP' })
  state: string;

  @Expose()
  @ApiProperty({ example: 450 })
  count: number;
}

@Exclude()
export class UsersDataDto implements IUsersData {

  @Expose()
  @ApiProperty({ example: 1200 })
  totalUsers: number;

  @Expose()
  @Type(() => CityStatsDto)
  @ApiProperty({ type: [CityStatsDto] })
  usersByCity: CityStatsDto[];

  @Expose()
  @Type(() => StateStatsDto)
  @ApiProperty({ type: [StateStatsDto] })
  usersByState: StateStatsDto[];

  @Expose()
  @ApiProperty({ example: 75.5 })
  averageHourlyRate: number;

  @Expose()
  @ApiProperty({ example: 4.6 })
  averageScore: number;

  @Expose()
  @ApiProperty({ example: 3.2 })
  averageProposalsPerUser: number;
}