import type { Project } from ".";

export const PROJECT_VERSION = 1;

export function migrateVersion(project: Project): Project {
  if (!project.version) project.version = 0;
  if (project.version === PROJECT_VERSION) return project;
  console.debug("migrating project", project);

  if (project.version > PROJECT_VERSION) {
    throw new Error(
      "Project version is newer than this program. Please update the program.",
      {
        cause: {
          savedVersion: project.version,
          programVersion: PROJECT_VERSION,
        },
      },
    );
  }
  return project;
}
