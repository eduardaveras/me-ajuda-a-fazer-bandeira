class FindProjectByIdUseCase {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }

    async execute({projectId}) {
        if (!projectId) {
            throw new Error('Project ID is required');
        }
        
        const project = await this.projectRepository.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        return project;
    }
}

module.exports = FindProjectByIdUseCase;