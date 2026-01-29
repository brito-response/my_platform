import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobfrellasService } from './jobfrellas.service';
import { CreateJobFrellaDto, UpdateJobfrellaDto } from './dto';

@Controller('jobfrellas')
export class JobfrellasController {
  constructor(private readonly jobfrellasService: JobfrellasService) { }

  @Post()
  async create(@Body() createJobfrellaDto: CreateJobFrellaDto) {
    return await this.jobfrellasService.create(createJobfrellaDto);
  }

  @Get()
  async findAll() {
    return await this.jobfrellasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.jobfrellasService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobfrellaDto: UpdateJobfrellaDto) {
    return await this.jobfrellasService.update(id, updateJobfrellaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.jobfrellasService.remove(id);
  }
}
