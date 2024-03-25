import type { Project } from ".";

export const PROJECT_VERSION = 1;

export function migrateVersion(project: Project): Project {
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

  for (let i = project.version || 0; i < PROJECT_VERSION; i++) {
    project = migrate[i](project);
  }
  project.version = PROJECT_VERSION;

  return project;
}

const migrate: ((project: Project) => Project)[] = [
  // 0 to 1
  (project) => {
    for (const page of project.pages) {
      // Get template from segments
      let template = "empty";
      for (const node of page.nodes) {
        switch (node.type) {
          case "text": {
            // Transform old text node type to item with text data
            node.type = "item";
            node.data.showText = true;
            node.data.textWidth = node.width || 120;
            node.data.textHeight = node.height || 80;
            delete node.width;
            delete node.height;
            break;
          }
          case "slider": {
            // Add icons to slider data in the same order as before custom icons
            node.data.leftIcon = {
              default: "Male",
            };
            node.data.rightIcon = {
              default: "Female",
            };
            break;
          }
          case "segment": {
            template = node?.data?.template || template;
          }
        }
      }
      page.data = {
        name: page.name,
        template,
        keepWithinParent: true,
        showItemNames: false,
        showRelationWarnings: true,
      };
      delete page.name;
    }
    return project;
  },
];
