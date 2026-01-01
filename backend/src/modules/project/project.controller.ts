import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { extname, join } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ApiError } from 'src/common/errors/api.error';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.createWithrelationship(createProjectDto);
  }
  
  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }
  
  @Get('reports')
  async findReports() {
    return await this.projectService.getReports();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.projectService.remove(id);
  }

  @Patch(':id/images')
  @ApiOperation({ summary: 'Upload de imagens de um projeto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { images: { type: 'array', items: { type: 'string', format: 'binary' } } } } })
  @UseInterceptors(
    FilesInterceptor('images', 3, {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads/projects'),
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadImages(@Param('id') id: string, @UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new ApiError('Nenhuma imagem enviada', 400);
    }

    // Garante que cada arquivo terá um path
    const filePaths = files.map(file => `/uploads/projects/${file.filename}`);

    // Chama o serviço para adicionar imagens
    const updatedProject = await this.projectService.addImages(id, filePaths);

    return updatedProject;
  }

}
