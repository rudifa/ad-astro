import { expect, test } from "vitest";
import { convertToHierarchy } from "../../util/json-to-d3-hierarchy";

const jsonOneChild = {
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

const expectedOneChild = {
  name: "Ancestors",
  children: [
    {
      name: "Tom Johnson",
      children: [
        {
          name: "Alice Johnson",
          children: [],
        },
        {
          name: "Bob Johnson",
          children: [],
        },
      ],
    },
    {
      name: "Mary Williams",
      children: [
        {
          name: "Alice Johnson",
          children: [],
        },
        {
          name: "Bob Johnson",
          children: [],
        },
      ],
    },
  ],
};

// Test the convertToHierarchy function with in-file data
test("convertToHierarchy converts data with one child", () => {
  const result = convertToHierarchy(jsonOneChild);

  expect(result).toEqual(expectedOneChild);
});


// Test the convertToHierarchy function with external data
test("convertToHierarchy converts file data with one child", async () => {
  // read data from a json file
  const data = await import("./one-child.json");

  // Check if the imported data is an object
  if (typeof data === "object" && data !== null) {
    const dataSize = Object.keys(data).length;
    console.log(`Data size: ${dataSize}`);

    // Perform the assertion
    expect(dataSize).toBeLessThanOrEqual(2);
  } else {
    throw new Error("Imported data is not an object");
  }

  console.log("Object.keys(data):", Object.keys(data));
  console.log(
    "Object.getOwnPropertyNames(data):",
    Object.getOwnPropertyNames(data),
  );
  console.log("data.default:", data.default);

  // Convert jsonContent to a JSON string
  const jsonString = JSON.stringify(data.default);

  console.log(jsonString); // This will be a string representation of

  console.log(JSON.stringify(data.default, null, 2));

  // Convert the data to a hierarchy
  const result = convertToHierarchy(jsonOneChild);

  // Check the result of the conversion
  expect(result).toEqual(expectedOneChild);
});
