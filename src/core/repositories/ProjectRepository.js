class ProjectRepository {
    async save (project, image) {
        throw new Error("Method 'save()' must be implemented.");
    }

    async findById (id) {
        throw new Error("Method 'findById()' must be implemented.");
    }
}

module.exports = ProjectRepository;