const ProjectRepository = require('../../core/repositories/ProjectRepository');
const db = require('./connection');

class SQLiteProjectRepository extends ProjectRepository {
    async save(project, image) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const insertImage = db.prepare("INSERT INTO images (id, image_data, width, height) VALUES (?, ?, ?, ?)");
                insertImage.run(image.id, image.imageData, image.width, image.height, (err) => {
                    if (err) return reject(err);
                    insertImage.finalize();

                    const insertProject = db.prepare("INSERT INTO projects (id, name, image_id) VALUES (?, ?, ?)");
                    insertProject.run(project.id, project.name, project.imageId, (err) => {
                        if (err) return reject(err);
                        insertProject.finalize();
                        resolve();
                    });
                });
            });
        });
    }

    async findById(projectId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    p.name,
                    p.id as projectId,
                    i.image_data as imageData,
                    i.width,
                    i.height
                FROM projects p
                INNER JOIN images i ON p.image_id = i.id
                WHERE p.id = ?`;

            db.get(sql, [projectId], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }
}

module.exports = SQLiteProjectRepository;