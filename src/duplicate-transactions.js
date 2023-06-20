// function findDuplicateTransactions(transactions) {}

// export default findDuplicateTransactions;


const input = [

    [

        {

            id: 1,

            sourceAccount: 'A',

            targetAccount: 'B',

            amount: 100,

            category: 'eating_out',

            time: '2018-03-02T10:33:00.000Z',

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

            id: 3,

            sourceAccount: 'A',

            targetAccount: 'B',

            amount: 100,

            category: 'eating_out',

            time: '2018-03-02T10:34:30.000Z',

        },

    ],

    [

        {

            id: 5,

            sourceAccount: 'A',

            targetAccount: 'C',

            amount: 250,

            category: 'other',

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

    ],

];







function findDuplicateTransactions(input) {

    // code here

    let transactions = input;

    // sort transactions

    const getTimeStamp = (time) => {

        const date = new Date(time);

        return Date.parse(date);

    }

    transactions.sort((tranA, tranB) => getTimeStamp(tranA.time) - getTimeStamp(tranB.time));




    const group = [];

    while (transactions.length > 0){

        const duplicates = [];

        let duplicatePos = 0;

        while (duplicatePos !== -1){

            const newDuplicate = transactions.splice(duplicatePos, 1)[0];

            duplicates.push(newDuplicate);

            duplicatePos = transactions.findIndex(transaction => checkDuplicate(transaction, newDuplicate));

        }

        group.push(duplicates);

    }






    function checkDuplicate(tranA, tranB) {

        if (tranA.sourceAccount !== tranB.sourceAccount)

            return false;

        if (tranA.targetAccount !== tranB.targetAccount)

            return false;

        if (tranA.amount !== tranB.amount)

            return false;

        if (tranA.category !== tranB.category)

            return false;

        if (getTimeStamp(tranB.time) - getTimeStamp(tranA.time) >= 60000)

            return false;

        return true;

    }





}




//export default findDuplicateTransactions;