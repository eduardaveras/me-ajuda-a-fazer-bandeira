class ProjectController {
    constructor(createProjectUseCase, findProjectByIdUseCase) {
        this.createProjectUseCase = createProjectUseCase;
        this.findProjectByIdUseCase = findProjectByIdUseCase;
    }

    async create(req, res) {
        if (!req.file) return res.status(400).send('No file uploaded :(');

        try {
            const project = await this.createProjectUseCase.execute({
                fileBuffer: req.file.buffer,
                originalFilename: req.file.originalname
            });
            res.redirect(`/projects/${project.id}`);
        } catch (error) {
            res.status(500).send(`Error creating project: ${error.message}`);
        }
    }

    async find(req, res) {
        try {
            const { projectId } = req.params;
            const project = await this.findProjectByIdUseCase.execute({ projectId });

            if (project) res.render('project', { project });
            else res.status(404).send('Project not found');
        } catch (error) {
            res.status(500).send(`Error finding project: ${error.message}`);
        }
    }
}

module.exports = ProjectController;