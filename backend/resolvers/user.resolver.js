import { users } from '../dummyData/data.js';
import bcrypt from "bcryptjs";
import User from '../models/user.model.js';

const userResolver = {
    Mutation: {
        signUp: async (_, { input }, context) => {
            try {
                const { userName, name, password, gender } = input
                if (!userName || !name || !password || gender) {
                    throw new Error('All fields are required');
                }

                const existingUser = await users.findOne({ userName });
                if (existingUser) {
                    throw new Error('User already exists');
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newuser = new User({
                    userName,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
                })

                await newuser.save();
                await context.login(newUser);
                return newUser;
            } catch (err) {
                console.error("Error in signUp: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        login: async (_, { input }, context) => {
            try {
                const { userName, password } = input;
                const { user } = await context.authenticate("graphql-local", { userName, password });

                await context.login(user);
                return user;

            } catch (err) {
                console.error("Error in login: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        logout: async (_, __, context) => {
            try {
                await context.logout();
                res.session.destroy((err) => {
                    if (err) {
                        throw new Error(err.message || "Internal server error");
                    }
                })
                res.clearCookie("connect.sid");
                return { message: "Logout successful" };
            } catch (err) {
                console.error("Error in logout: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    },

    Query: {
        authUser: async (_, __, context) => {
            try {
                const user = await context.getUser();
                return user;
            } catch (err) {
                console.error("Error in authUser: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        user: async (_, { userId }) => {
            try {
                const user = await User.findById(userId);
                return user;
            } catch (err) {
                console.error("Error in user: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    },

}

export default userResolver;