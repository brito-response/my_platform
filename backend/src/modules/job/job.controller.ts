import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../user/utils/decorators/roles.decorator';
import { JwtAuthGuard } from '../user/utils/guards/jwt.guard';
import { RolesGuard } from '../user/utils/guards/roles.guard';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) { }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    return await this.jobService.create(createJobDto);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.jobService.findAll();
  }

  @Get('reports')
  async findReports() {
    return await this.jobService.getReports();
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') jobId: string) {
    return await this.jobService.findOne(jobId);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') jobId: string, @Body() updateJobDto: UpdateJobDto) {
    return await this.jobService.update(jobId, updateJobDto);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') jobId: string) {
    return await this.jobService.remove(jobId);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/contracts')
  async findContractOfJob(@Param('id') jobId: string) {
    return await this.jobService.findContractOfJob(jobId);
  }

  //GET /jobs/search?q=designer -- filtrar) jobs de acordo com uma palavra-chave passada na URL
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('search')
  async searchJobs(@Query('q') query: string) {
    return await this.jobService.searchJobs(query);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('categories/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string) {
    return await this.jobService.findByCategory(categoryId);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('users/:userId')
  async findJobsByUser(@Param('userId') userId: string) {
    return await this.jobService.findJobsByUser(userId);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/proposals')
  async getJobWithProposals(@Param('id') jobId: string) {
    return await this.jobService.getJobWithAllProposals(jobId);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/proposals/ids')
  async getProposalIds(@Param('id') jobId: string): Promise<string[]> {
    return await this.jobService.getProposalIds(jobId);
  }

}
