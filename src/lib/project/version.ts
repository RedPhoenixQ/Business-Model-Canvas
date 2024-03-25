import type { Project } from ".";

export const PROJECT_VERSION = 1;

export function migrateVersion(project: Project): Project {
  if (!project.version) project.version = 0;
  if (project.version === PROJECT_VERSION) return project;
  console.debug("migrating project", project);
  return project;
}
