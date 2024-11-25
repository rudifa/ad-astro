# stringifyCircular

in js, JSON.stringify bails out on circular JSON objects. I'd like to have a better one that keeps a stack of visited (children) nodes, marks the circularity when it sees an already-on-stack, does not go further down, and so completes the visit


I see you already have two implementations in your file (getCircularReplacer and stringifyCircular). The stringifyCircular function is actually already doing what you're asking for - it uses a WeakSet to track visited nodes and handles circular references. However, we can enhance it to specifically track the stack path rather than just visited nodes.
Here's an improved version:


```
function stringifyCircular(obj, maxDepth = 5, depth = 0, stack = new Set(), path = '') {
  const indent = "  ".repeat(depth);
  const childIndent = "  ".repeat(depth + 1);

  // Handle primitive types
  if (obj === null) return "null";
  if (typeof obj !== "object") return JSON.stringify(obj);

  // Generate unique path for current object
  const currentPath = path ? `${path}.${depth}` : depth.toString();

  // Check for circular references and max depth
  if (stack.has(obj)) {
    return `"[Circular Reference at ${currentPath}]"`;
  }
  if (depth >= maxDepth) {
    return '"[Max Depth Reached]"';
  }

  stack.add(obj);

  // Handle arrays
  if (Array.isArray(obj)) {
    const items = obj.map((item, index) =>
      childIndent + stringifyCircular(item, maxDepth, depth + 1, stack, `${currentPath}[${index}]`)
    );
    stack.delete(obj);
    if (items.length === 0) return "[]";
    return `[\n${items.join(",\n")}\n${indent}]`;
  }

  // Handle d3.hierarchy Node (keep your existing special case)
  if (obj.constructor.name === "Node") {
    const safe = {
      data: obj.data,
      height: obj.height,
      depth: obj.depth,
      ...(typeof obj.x !== "undefined" && { x: obj.x }),
      ...(typeof obj.y !== "undefined" && { y: obj.y }),
      children: obj.children,
    };
    obj = safe;
  }

  // Handle regular objects
  const entries = Object.entries(obj)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      const stringValue = stringifyCircular(value, maxDepth, depth + 1, stack, `${currentPath}.${key}`);
      return `${childIndent}"${key}": ${stringValue}`;
    });

  stack.delete(obj);
  if (entries.length === 0) return "{}";
  return `{\n${entries.join(",\n")}\n${indent}}`;
}
```
