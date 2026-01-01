import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) { }

  @Post()
  async create(@Body() createContractDto: CreateContractDto) {
    return await this.contractService.create(createContractDto);
  }

  @Get()
  async findAll() {
    return await this.contractService.findAll();
  }

  @Get('reports')
  async findReports() {
    return await this.contractService.getReports();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.contractService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return await this.contractService.update(id, updateContractDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.contractService.remove(id);
  }

  @Get('jobs/:jobId')
  async findContractByJob(@Param('jobId') jobId: string) {
    return await this.contractService.findByJob(jobId);
  }

  @Get('users/:userId')
  async findContractsByUser(@Param('userId') userId: string) {
    return await this.contractService.findByUser(userId);
  }

  @Patch(':id/close')
  async closeContract(@Param('id') id: string) {
    return await this.contractService.closeContract(id);
  }

}
