import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';

@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) { }

  @Post()
  async create(@Body() createProposalDto: CreateProposalDto) {
    return await this.proposalService.create(createProposalDto);
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProposalDto: UpdateProposalDto) {
    return await this.proposalService.update(id, updateProposalDto);
  }

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

  @Patch(':id/accept')
  async acceptProposal(@Param('id') id: string) {
    return await this.proposalService.acceptProposal(id);
  }

}
