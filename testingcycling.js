rootScope = angular.element($0).scope()

node = rootScope;
while (node != null) {
    if (node.$ctrl != null) {
        console.log(node.$ctrl.constructor.name)
    }
    node = node.$$childHead;
}
