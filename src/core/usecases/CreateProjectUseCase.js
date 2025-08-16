const crypto = require('crypto');
const path = require('path');
const imageSize = require('image-size').default || require('image-size');
const Project = require('../entities/Project');
const Image = require('../entities/Image');

class CreateProjectUseCase {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }

    async execute({ fileBuffer, originalFilename}) {
        const dimensions = imageSize(fileBuffer);
        const dataUrl = `data:image/png;base64,${fileBuffer.toString('base64')}`;

        const image = new Image(
            crypto.randomUUID(),
            dataUrl,
            dimensions.width,
            dimensions.height
        );

        const projectName = path.parse(originalFilename).name.replace(/_/g, ' ').replace(/\b\w/g, c=> c.toUpperCase());
        const project = new Project(
            crypto.randomUUID(),
            projectName,
            image.id
        );

        await this.projectRepository.save(project, image);
        return project;
    }
}

module.exports = CreateProjectUseCase;