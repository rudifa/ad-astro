#!/usr/local/bin/node

// This function takes a JSON object representing a family tree and transforms it
// into a hierarchical structure that can be used with D3.js to visualize the tree.

function transformToD3Hierarchy(data) {
  const personMap = new Map();

  // First pass: Create person objects and store them in the map
  data.persons.forEach((person) => {
    personMap.set(person.fullname, { name: person.fullname, children: [] });
  });

  // Second pass: Establish parent-child relationships
  data.persons.forEach((person) => {
    const personNode = personMap.get(person.fullname);
    const fatherNode = personMap.get(person.father);
    const motherNode = personMap.get(person.mother);

    if (fatherNode) {
      fatherNode.children.push(personNode);
    }
    if (motherNode) {
      motherNode.children.push(personNode);
    }
  });

  // Find all top-level nodes (persons with no parents in the dataset)
  const roots = Array.from(personMap.values()).filter(
    (person) =>
      !data.persons.some(
        (p) => p.father === person.name || p.mother === person.name,
      ),
  );

  // If there's only one root, return it
  if (roots.length === 1) {
    return roots[0];
  }

  // If there are multiple roots, create a super-root to connect them
  return {
    name: "Family Tree",
    children: roots,
  };
}

// Example usage:
const inputData = {
  persons: [
    {
      fullname: "John Doe",
      father: "Robert Doe",
      mother: "Jane Smith",
    },
    {
      fullname: "Jane Smith",
      father: "Michael Smith",
      mother: "Anna Johnson",
    },
    {
      fullname: "Robert Doe",
      father: "William Doe",
      mother: "Sarah Miller",
    },
    {
      fullname: "Alice Johnson",
      father: "Tom Johnson",
      mother: "Mary Williams",
    },
  ],
};

const hierarchyData = transformToD3Hierarchy(inputData);
console.log(JSON.stringify(hierarchyData, null, 2));
