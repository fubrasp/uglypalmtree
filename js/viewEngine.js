//***************DATA STRUCTURE FRAMEWORK***************
/**
 * Queue
 */
function Queue() {
    this.dataStore = []
    this.enqueue = function enqueue(element) {
        this.dataStore.push(element)
    }
    this.dequeue = function dequeue() {
        return this.dataStore.shift()
    }
    this.front = function front() {
        return this.dataStore[0]
    }
    this.back = function back() {
        return this.dataStore[this.dataStore.length - 1]
    }
}
//helpers in order to manipulate data structure
function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

function Tree(data) {
    var node = new Node(data);
    this._root = node;
}

Tree.prototype.traverseDF = function(callback) {

    // this is a recurse and immediately-invoking function
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }

        // step 4
        callback(currentNode);

        // step 1
    })(this._root);

};

Tree.prototype.traverseBF = function(callback) {
    var queue = new Queue();

    queue.enqueue(this._root);

    currentTree = queue.dequeue();

    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }

        callback(currentTree);
        currentTree = queue.dequeue();
    }
};

Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};

Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };

    this.contains(callback, traversal);

    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};

Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;

    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };

    this.contains(callback, traversal);

    if (parent) {
        index = findIndex(parent.children, data);

        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }

    return childToRemove;
};

function findIndex(arr, data) {
    var index;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data === data) {
            index = i;
        }
    }

    return index;
}

//***************tree initialisation***************
var tree = new Tree('one');

//***************UX***************

//###Commands###
var addNodeButton = document.getElementById('add-node');
var removeNodeButton = document.getElementById('remove-node');
var logTreeButton = document.getElementById('log-tree');

addNodeButton.addEventListener("click", () => {
    console.log('add!');

}, false);

removeNodeButton.addEventListener("click", () => {
    console.log('remove!');
}, false);

logTreeButton.addEventListener("click", () => {
    tree.traverseDF(function(node) {
        console.log(node.data);
    });
}, false);


//###display###
var removeChildren = function(parentNode){
    while (parentNode.lastChild) {
        parentNode.removeChild(parentNode.lastChild);
    }
}

var customTraversBF = function(callback) {
    var treeDisplayZone = document.getElementById('tree-display');
    var ulRoot=document.createElement('ul');

    var liRoot=document.createElement('li');
    liRoot.innerText=tree._root.data;
    ulRoot.appendChild(liRoot);
    treeDisplayZone.appendChild(ulRoot);


    var queue = new Queue();

    queue.enqueue(this._root);

    currentTree = queue.dequeue();

    while (currentTree) {
        console.log('see children!!');
        var ul=document.createElement('ul');

        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);

            var li=document.createElement('li');
            console.log(currentTree.children[i]);
            li.innerText=currentTree.children[i];
            ul.appendChild(li);
        }

        callback(currentTree);
        currentTree = queue.dequeue();

        treeDisplayZone.appendChild(ul);
    }
};

var refreshDisplay = function () {
    console.log('has refresh tree display');
    var treeDisplayZone = document.getElementById('tree-display');
    removeChildren(treeDisplayZone);
    customTraversBF();
};

//When page start you need to show the root element
refreshDisplay();