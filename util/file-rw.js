
import { promises as fs } from "fs";

// ES6-compatible function using the fs module
// to read a JSON file and return a JavaScript object
export async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    throw error;
  }
}

// To use this function, you can call it like this:

// import { readJsonFile } from './readJsonFile.js';

// try {
//   const data = await readJsonFile("/path/to/your/file.json");
//   console.log(data);
//   // Use the data object here
// } catch (error) {
//   console.error("Failed to read JSON file:", error);
// }
