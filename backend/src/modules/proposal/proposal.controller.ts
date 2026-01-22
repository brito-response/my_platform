import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from '../user/utils/decorators/roles.decorator';
import { ApiErrorResponseDto } from 'src/common/errors/base.api.error.dto';
import { CreateProposalDto, ResponseProposalDto, UpdateProposalDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../user/utils/guards';
import { ProposalService } from './proposal.service';

@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) { }

  @ApiCreatedResponse({ type: ResponseProposalDto })
  @ApiUnauthorizedResponse({ type: ApiErrorResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createProposalDto: CreateProposalDto): Promise<ResponseProposalDto> {
    return await this.proposalService.createForCustomProblem(createProposalDto);
  }

  @ApiOkResponse({ type: ResponseProposalDto, isArray: true })
  @Get()
  async findAll(): Promise<ResponseProposalDto[]> {
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

  @ApiCreatedResponse({ type: ResponseProposalDto })
  @ApiUnauthorizedResponse({ type: ApiErrorResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/accept')
  async acceptProposal(@Param('id') id: string) {
    return await this.proposalService.acceptProposal(id);
  }

}
