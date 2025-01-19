
const logger = require('../utils/Logger');
class Node {
    constructor(name, parentName, relativePath,type,extension,children=new Array([]), expanded = false) {
        this.name = name;
        this.parentName = parentName;
        this.relativePath = relativePath;
        this.type = type;        
        this.extension = extension;
        this.expanded = expanded;        
        this.children = children;
    }
}

class Tree {

    constructor(nodes,rootNode) {

        this.tree = [];
        const node = new Node(rootNode, '', '','root','',[]);
        this.tree.push(node);
        
        this.setTree(nodes);
        //logger.log(JSON.stringify(this.tree))

    }

    getTree() {
        return this.tree;
    }
    setTree(nodes) {
        Object.values(nodes).forEach(node => {
            let arr = node.relative_path.split('/');
            const nodetree = this.addNode(this.tree,arr,'',node)
        })

    }


    addFileToNode(arrPathNode,parentName,node,nodeToAdd) {
        if (arrPathNode.length == 1) {
            const nodenew =new Node(nodeToAdd.file, parentName,nodeToAdd.relative_path,'File','PDF',[]);
            node.push(nodenew);
        }      
    }

       
    addNode(nodetree,arrPathNode,parentName,nodeToAdd) {

        if (arrPathNode[0] != undefined) {
            if (nodetree) {
                const posElement = nodetree.findIndex((element) =>element.name == arrPathNode[0]);
                if (posElement  != -1) {
                    this.addFileToNode(arrPathNode,arrPathNode[0],nodetree[posElement].children,nodeToAdd)
                    arrPathNode.shift();
                    return this.addNode(nodetree[posElement].children,arrPathNode,nodetree[posElement].name,nodeToAdd)
                }
                else    {
                    const node = new Node(arrPathNode[0], parentName, '','DIR' ,'',new Array());
                    this.addFileToNode(arrPathNode,node.name,node.children,nodeToAdd)
                    nodetree.push(node);
                    const posElement = nodetree.findIndex((element) =>element.name == arrPathNode[0]);
                    arrPathNode.shift();
                    return this.addNode(nodetree[posElement].children,arrPathNode,nodetree[posElement].name,nodeToAdd)
                }
            } 
            //else logger.log('       --> EXIT IF  nodetree');
        }
        //else logger.log('       --> EXIT IF  arrPathNode');

        return nodetree;

        
    }



}


module.exports = { Node, Tree};

