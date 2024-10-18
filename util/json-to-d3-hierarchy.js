#!/usr/local/bin/node

// https://chatgpt.com/c/66f67a64-e0c4-8010-aab4-9db8885dff8a

// **Question:**

// **I want to write a javascript function to convert family data formatted alike this:**
// data = {
//   "persons": [
//     {
//       "name": "Alice Johnson",
//       "father": "Tom Johnson",
//       "mother": "Mary Williams"
//     },
//     ...
//   ]
// }
// **into data format suitable as input to d3.hierarchy(data)**
// result = {
//   "name": "Ancestors",
//   "children": [
//         {
//             "name": "Tom Johnson"
//             "children": [
//                 {
//                     "name": "Alice Johnson"
//                     "children": []
//                 }
//             ]
//         },
//         {
//             "name": "Mary Williams"
//             "children": [
//                 {
//                     "name": "Alice Johnson"
//                     "children": []
//                 }
//             ]
//         }
//     ],
//     ...
// }

// **Answer:**

// To convert your family data into a format suitable for d3.hierarchy(),
// you'll need to construct a tree where each parent points to their children. Here's how you can achieve this in JavaScript:

// Explanation:
// nodesMap: A Map to store each node by its name to avoid duplicates.
// getNode: A utility function to fetch or create a node.
// forEach loop: Iterates through each person, retrieves their parents, and establishes parent-child relationships.
// roots: Filters out nodes that are children of others, leaving only the top-level nodes.
// Final Structure: Returns the hierarchy starting with a root named "Ancestors" and its children.

// Expected Structure of data
// The data object should have the following structure:

// Properties
//   persons: An array of person objects.
// Each person object should have the following properties:
//   name: A string representing the name of the person.
//   father: A string representing the name of the person's father (optional).
//   mother: A string representing the name of the person's mother (optional).


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

// const hierarchy = convertToHierarchy(data);
// console.log(JSON.stringify(hierarchy, null, 2));
