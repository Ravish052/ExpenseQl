import { gql } from "@apollo/client";

export const SIGN_UP_USER = gql`
    mutation SignUp($input : SignUpInput!) {
        signUp(input: $input) {
            _id
            userName
            name
            profilePicture
        }
    }
`

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            _id
            name
            userName
    }
}
`

export const LOGOUT = gql`
    mutation logout{
        logout {
            message
        }
    }
`