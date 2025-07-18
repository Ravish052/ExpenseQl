const transactionTypeDef = `#graphql
    type Transaction{
        _id : ID!,
        userId : ID!,
        description : String!,
        paymentType : String!,
        category : String!,
        amount : Float!,
        loacation : String,
        date : String!,
    }

    type Query {
        transactions : [Transaction!]
        transaction(transactionId:ID!): Transaction
    }

    type Mutation {
        createTransaction (input: createTransactionInput!): Transaction!
        updateTransaction (transactionId:ID!, input: updateTransactionInput!): Transaction!
        deleteTransaction (transactionId:ID!): Transaction!
    }

    input createTransactionInput {
        description : String!,
        paymentType : String!,
        category : String!,
        amount : Float!,
        loacation : String,
        date : String!,
    }

    input updateTransactionInput {
        description : String,
        paymentType : String,
        category : String,
        amount : Float,
        loacation : String,
        date : String,
    }
`;

    export default transactionTypeDef;