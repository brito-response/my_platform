import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobfrellasService } from './jobfrellas.service';
import { CreateJobfrellaDto } from './dto/create-jobfrella.dto';
import { UpdateJobfrellaDto } from './dto/update-jobfrella.dto';

@Controller('jobfrellas')
export class JobfrellasController {
  constructor(private readonly jobfrellasService: JobfrellasService) {}

  @Post()
  create(@Body() createJobfrellaDto: CreateJobfrellaDto) {
    return this.jobfrellasService.create(createJobfrellaDto);
  }

  @Get()
  findAll() {
    return this.jobfrellasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobfrellasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobfrellaDto: UpdateJobfrellaDto) {
    return this.jobfrellasService.update(id, updateJobfrellaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobfrellasService.remove(id);
  }
}
