class Node {
    constructor(name, parentName, relativePath,type,extension,children) {
        this.name = name;
        this.parentName = parentName;
        this.relativePath = relativePath;
        this.type = type;        
        this.extension = extension;
        this.children = children;
        this.children = [];
    }
}
JSON.stringify
function buildTree(data, parentName = null) {
    const nodes = {};
    // Create nodes for each item in the data
    data.forEach(({ name, parentName, relativePath,type,extension, }) => {
        nodes[name] = new Node(name, parentName, relativePath,type,extension,);
    });
    const tree = [];
    Object.values(nodes).forEach(node => {
        // Check if the node belongs to the current parent
        if (node.parentName === parentName) {
            // Recursively build the children of the current node
            const children = buildTree(data, node.name);
            // Set the children of the current node
            node.children = children;
            // Add the current node to the tree
            tree.push(node);
        }
    });
    return tree;
}

module.exports = { Node, buildTree };

