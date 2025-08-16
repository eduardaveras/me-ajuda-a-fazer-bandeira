const express = require('express');
const path = require('path');

const SQLiteProjectRepository = require('./infrastructure/database/SQLiteProjectRepository');
const CreateProjectUseCase = require('./core/usecases/CreateProjectUseCase');
const FindProjectByIdUseCase = require('./core/usecases/FindProjectByIdUseCase');
const ProjectController = require('./infrastructure/web/ProjectController');
const createRoutes = require('./infrastructure/web/routes');

const projectRepository = new SQLiteProjectRepository();
const createProjectUseCase = new CreateProjectUseCase(projectRepository);
const findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository);
const projectController = new ProjectController(createProjectUseCase, findProjectByIdUseCase);
const router = createRoutes(projectController);

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});