var tree = new Tree('one');

tree._root.children.push(new Node('two'));
tree._root.children[0].parent = tree;

tree._root.children.push(new Node('three'));
tree._root.children[1].parent = tree;

tree._root.children.push(new Node('four'));
tree._root.children[2].parent = tree;

tree._root.children[0].children.push(new Node('five'));
tree._root.children[0].children[0].parent = tree._root.children[0];

tree._root.children[0].children.push(new Node('six'));
tree._root.children[0].children[1].parent = tree._root.children[0];

tree._root.children[2].children.push(new Node('seven'));
tree._root.children[2].children[0].parent = tree._root.children[2];

/*

creates this tree

 one
 ├── two
 │   ├── five
 │   └── six
 ├── three
 └── four
     └── seven

*/
// read the value in the tree
tree.traverseDF(function(node) {
    console.log(node.data)
});

/*

logs the following strings to the console

'five'
'six'
'two'
'three'
'seven'
'four'
'one'

*/