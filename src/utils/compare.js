
    function compare (direction = 1) {
        return function (listA, listB) {
            const nameA = `${listA.name.last} ${listA.name.first}`
            const nameB = `${listB.name.last} ${listB.name.last}`
        
             let res = 0;
             console.log(nameA);

             if (nameA > nameB) {
                 res = 1;
             }
             else if (nameB > nameA){
                 res = -1;
             }
             return res * direction;
        }
        
    }
    export default compare;