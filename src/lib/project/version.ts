import type { Project } from ".";

type Semver = `${number}.${number}.${number}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function migrateVersion(project: any & { version: Semver }): Project {
  if (project.version === APP_VERSION) return project as Project;
  if (!project.version) project.version = "0.0.0";
  const savedVersion = project.version;
  console.debug("migrating project from verison", project.version, project);

  let migrate = migratations[project.version];
  if (!migrate)
    throw new Error(`Cannot migrate project from version ${project.version}`);
  while (migrate) {
    if (typeof migrate === "string") {
      project.version = migrate;
    } else {
      try {
        project = migrate(project);
      } catch (err) {
        console.log("Error migrating from", project.version, err);
        throw new Error(`Error migrating from ${project.version}`, {
          cause: err,
        });
      }
    }
    migrate = migratations[project.version];
  }
  if (project.version !== APP_VERSION) {
    throw new Error(
      `Could not migrate project to current version ${APP_VERSION} from ${savedVersion}`,
    );
  }

  return project;
}

const migratations: Record<
  Semver,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Semver | ((project: any) => any & { version: Semver })
> = {
  "0.0.0": (project) => {
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
    project.version = "0.0.1";
    return project;
  },
  "0.0.1": "0.0.2",
  "0.0.2": (project) => {
    const removedSegments = ["sustainable-company", "impact", "sustainability"];
    for (const page of project.pages) {
      if (page.data.template !== "detailed") continue;
      // Remove the top row
      page.grid.rows.shift();
      // Filter away the removed segments
      page.nodes = page.nodes.filter(
        (node: { type: string; id: string }) =>
          node.type !== "segment" || !removedSegments.includes(node.id),
      );
      // Update all nodes within removed segments to be placed outside the grid
      for (const node of page.nodes) {
        if (node.parentNode && removedSegments.includes(node.parentNode)) {
          node.parentNode = undefined;
          node.position.y = -100;
        }
      }
    }
    project.version = "0.0.3";
    return project;
  },
  "0.0.3": "0.0.4",
};
