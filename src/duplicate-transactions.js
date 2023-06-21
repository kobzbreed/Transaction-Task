function findDuplicateTransactions(transactions) {
    let transList = transactions.slice()
    const output = []
    let allDuplicates = []
    const timePeriod = (transaction) =>{
        return Date.parse(transaction.time)
    }
    function catchDuplicates(trans1, trans2){
        if(trans1.amount !== trans2.amount){
            return false
        }
        if(trans1.sourceAccount !== trans2.sourceAccount){
            return false
        }
        if(trans1.targetAccount !== trans2.targetAccount){
            return false
        }
        if(trans1.category !== trans2.category){
            return false
        }
        if(Math.abs(timePeriod(trans1)- timePeriod(trans2)) > 60000){
            return false
        }

        return true
    }
    transList.sort((a, b) => timePeriod(a) - timePeriod(b))
    transList.forEach(function(trans){
        for(let i = 0; i < transList.length; i++){
            if(catchDuplicates(trans, transList[i]) && trans.id !== transList[i].id){
                allDuplicates.push(transList[i])
            }
        }
    })
    allDuplicates = [...new Set(allDuplicates)]
    allDuplicates.sort((a, b) => timePeriod(a) - timePeriod(b))

    while(allDuplicates.length){
        let currentDuplicate = allDuplicates[0]
        let groupedDuplicate = []
        groupedDuplicate.push(currentDuplicate)
        for(let i = 0; i < allDuplicates.length; i++){
            if(catchDuplicates(groupedDuplicate[groupedDuplicate.length -1], allDuplicates[i])){
                groupedDuplicate.push(allDuplicates[i])
            }
        }
        groupedDuplicate.forEach(function(seen){
            let remove = allDuplicates.findIndex(dup => dup === seen)
            allDuplicates.splice(remove, 1)
        })
        groupedDuplicate = [...new Set(groupedDuplicate)]
        output.push(groupedDuplicate)
    }

    return allDuplicates
}

// export default findDuplicateTransactions;


const input = [
    {
      id: 3,
      sourceAccount: 'A',
      targetAccount: 'B',
      amount: 100,
      category: 'eating_out',
      time: '2018-03-02T10:34:30.000Z',
    },
    {
      id: 1,
      sourceAccount: 'A',
      targetAccount: 'B',
      amount: 100,
      category: 'eating_out',
      time: '2018-03-02T10:33:00.000Z',
    },
    {
      id: 6,
      sourceAccount: 'A',
      targetAccount: 'C',
      amount: 250,
      category: 'other',
      time: '2018-03-02T10:33:05.000Z',
    },
    {
      id: 4,
      sourceAccount: 'A',
      targetAccount: 'B',
      amount: 100,
      category: 'eating_out',
      time: '2018-03-02T10:36:00.000Z',
    },
    {
      id: 2,
      sourceAccount: 'A',
      targetAccount: 'B',
      amount: 100,
      category: 'eating_out',
      time: '2018-03-02T10:33:50.000Z',
    },
    {
      id: 5,
      sourceAccount: 'A',
      targetAccount: 'C',
      amount: 250,
      category: 'other',
      time: '2018-03-02T10:33:00.000Z',
    },
  ];

console.log(findDuplicateTransactions(input))





// function findDuplicateTransactions(input) {

//     // code here

//     let transactions = input;

//     // sort transactions

//     const getTimeStamp = (time) => {

//         const date = new Date(time);

//         return Date.parse(date);

//     }

//     transactions.sort((tranA, tranB) => getTimeStamp(tranA.time) - getTimeStamp(tranB.time));




//     const group = [];

//     while (transactions.length > 0){

//         const duplicates = [];

//         let duplicatePos = 0;

//         while (duplicatePos !== -1){

//             const newDuplicate = transactions.splice(duplicatePos, 1)[0];

//             duplicates.push(newDuplicate);

//             duplicatePos = transactions.findIndex(transaction => checkDuplicate(transaction, newDuplicate));

//         }

//         group.push(duplicates);

//     }






//     function checkDuplicate(tranA, tranB) {

//         if (tranA.sourceAccount !== tranB.sourceAccount)

//             return false;

//         if (tranA.targetAccount !== tranB.targetAccount)

//             return false;

//         if (tranA.amount !== tranB.amount)

//             return false;

//         if (tranA.category !== tranB.category)

//             return false;

//         if (getTimeStamp(tranB.time) - getTimeStamp(tranA.time) >= 60000)

//             return false;

//         return true;

//     }

//     return group



// }




//export default findDuplicateTransactions;