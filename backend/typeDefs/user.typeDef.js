const userTypeDef = `#graphql
    type User {
        _id : ID!,
        userName : String!,
        name : String!,
        profilePicture : String,
        gender : String!,
    }

    type Query {
        authUser : User
        user(userId: ID!): User
    }

    type Mutation {
        signUp(input : SignUpInput!): User
        login(input : LoginInput!): User
        logout: LogoutResponse
    }

    input SignUpInput {
        userName: String!
        name: String!
        password: String!
        gender: String!
        
    }

    input LoginInput {
        userName: String!
        password: String!
    }

    type LogoutResponse {
        message: String!
    }
`;

export default userTypeDef;