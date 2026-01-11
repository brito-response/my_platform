import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { RolesGuard } from '../user/utils/guards/roles.guard';
import { JwtAuthGuard } from '../user/utils/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../user/utils/decorators/roles.decorator';

@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) { }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createProposalDto: CreateProposalDto) {
    return await this.proposalService.createForCustomProblem(createProposalDto);
  }

  @Get()
  async findAll() {
    return await this.proposalService.findAll();
  }

  @Get('reports')
  async findReports() {
    return await this.proposalService.getReports();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.proposalService.findOne(id);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProposalDto: UpdateProposalDto) {
    return await this.proposalService.update(id, updateProposalDto);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.proposalService.remove(id);
  }

  @Get('job/:jobId')
  async findProposalsByJob(@Param('jobId') jobId: string) {
    return await this.proposalService.findByJob(jobId);
  }

  @Get('users/:userId')
  async findProposalsByUser(@Param('userId') userId: string) {
    return await this.proposalService.findByUser(userId);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/accept')
  async acceptProposal(@Param('id') id: string) {
    return await this.proposalService.acceptProposal(id);
  }

}
