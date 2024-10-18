#!/usr/local/bin/node

export function convertToHierarchy(data) {
  // Create a map to store all nodes by name
  const nodesMap = new Map();

  // Function to get or create a node
  const getNode = (name) => {
    if (!nodesMap.has(name)) {
      nodesMap.set(name, { name, children: [] });
    }
    return nodesMap.get(name);
  };

  // Iterate over all persons
  data.persons.forEach((person) => {
    const personNode = getNode(person.name);
    const fatherNode = getNode(person.father);
    const motherNode = getNode(person.mother);

    // Add the current person as a child of both parents
    if (fatherNode && person.father) fatherNode.children.push(personNode);
    if (motherNode && person.mother) motherNode.children.push(personNode);
  });

  // Now find all root nodes (nodes without parents)
  const roots = Array.from(nodesMap.values()).filter((node) => {
    return !data.persons.some(
      (person) => person.name === node.name && (person.father || person.mother),
    );
  });

  // Return the final hierarchy structure with a root node
  return {
    name: "Ancestors",
    children: roots,
  };
}

// Example usage
const data = {
  persons: [
    {
      name: "Alice Johnson",
      father: "Tom Johnson",
      mother: "Mary Williams",
    },
    {
      name: "Bob Johnson",
      father: "Tom Johnson",
      mother: "Mary Williams",
    },
  ],
};

// Main check
if (import.meta.url === `file://${process.argv[1]}`) {
  // The module is being executed directly, so run the main logic
  main();
}

import { readJsonFile } from "./file-rw.js";

async function convertFromFile(filePath) {
  try {
    const data = await readJsonFile(filePath);
    console.log("data:", JSON.stringify(data, null, 2));
    return convertToHierarchy(data);
  } catch (error) {
    console.error("Failed to convert JSON file to hierarchy:", error);
    throw error;
  }
}
// try {
//   const data = await readJsonFile("/path/to/your/file.json");
//   console.log(data);
//   // Use the data object here
// } catch (error) {
//   console.error("Failed to read JSON file:", error);
// }

function main() {
  {
    // Convert from local json object
    const hierarchy = convertToHierarchy(data);
    console.log("hierarchy 1:", JSON.stringify(hierarchy, null, 2));
  }
  {
    // Convert from file
    const hierarchy = convertFromFile("./data/one-child.json");
    console.log("hierarchy 2:", JSON.stringify(hierarchy, null, 2));
  }
  // {
  //   // Convert from file
  //   const multiarchy = convertFromFile("./data/two-children-unrelated.json");
  //   console.log("multiarchy:", JSON.stringify(multiarchy, null, 2));
  // }
}
