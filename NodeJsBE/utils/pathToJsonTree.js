
const logger = require("../Logger");
class Node {
    constructor(name, parentName, relativePath,type,extension,children=[]) {
        this.name = name;
        this.parentName = parentName;
        this.relativePath = relativePath;
        this.type = type;        
        this.extension = extension;
        this.children = children;

    }
}


class Tree {

    constructor(nodes,rootNode) {

        this.tree = [];
        const node = new Node(rootNode, '', '','root','',[]);
        this.tree.push(node);
        
        this.setTree(nodes);
        logger.log(JSON.stringify(this.tree))

    }

    setTree(nodes) {
        Object.values(nodes).forEach(node => {
            let arr = node.relative_path.split('/');
            const nodetree = this.addNode(this.tree,arr,'',null)

            logger.log('---------> RET  nodetree = ' + JSON.stringify(nodetree))

            //const newnode = new Node(node.name, node.parentName,node.relativePath,node.type,node.extension);
            //nodetree.push(newnode);

        })

    }

    addNode(nodetree,arrPathNode,parentName,nodeParent) {
        if (arrPathNode[0] != undefined) {
            if (nodetree) {
                const nodeElement = nodetree.find((element) =>element.name == arrPathNode[0]);

                if (nodeElement  != undefined) {
                    arrPathNode.shift();
                    logger.log('---------> IF arrPathNode = ' + JSON.stringify(arrPathNode))
                    return this.addNode(nodeElement.children,arrPathNode,nodetree.name)
                }
                else    {
                    logger.log('---------> ELSE arrPathNode[0] = ' + arrPathNode[0])
                    const node = new Node(arrPathNode[0], parentName, '','DIR','',[]);
                    nodetree.push(node);
                    logger.log('---------> ELSE 1 nodetree = ' + JSON.stringify(nodetree))
                    logger.log('---------> ELSE 2 this.tree = ' + JSON.stringify(this.tree))
                    arrPathNode.shift();
                    return this.addNode(nodetree.children,arrPathNode,nodetree.name,nodetree)

                }
            } 
        }
        
        return nodeParent;   
    }



}

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

module.exports = { Node, buildTree ,Tree};

