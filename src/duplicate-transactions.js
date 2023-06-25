function findDuplicateTransactions(transactions) {
    const transList = transactions.slice()
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
    allDuplicates = allDuplicates.sort((a, b) => timePeriod(a) - timePeriod(b))
    while(allDuplicates.length){
        let groupedDuplicate = [allDuplicates[0]]
        for(let i = 0; i < allDuplicates.length; i++){
            let target = groupedDuplicate[groupedDuplicate.length - 1]
            if(catchDuplicates(target, allDuplicates[i]) && target.id !== allDuplicates[i]){
                groupedDuplicate.push(allDuplicates[i])
            }
        }
        groupedDuplicate.forEach(function(seen){
            let remove = allDuplicates.findIndex(dup => dup === seen)
            allDuplicates.splice(remove, 1)
        })
        
        output.push(groupedDuplicate)
    }
    // console.log(output)
    return output
}

export default findDuplicateTransactions;
