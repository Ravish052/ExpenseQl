import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
    Query: {
        transactions: async (_, __, context) => {
            try {
                if (!context.getUser) {
                    throw new Error("Unauthorized access");
                }
                const userId = await context.getUser()._id

                const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
                return transactions;
            } catch (err) {
                console.error("Error in transactions query: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        transaction: async (_, { transactionId },) => {
            console.log("transactionId received in resolver:", transactionId);
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            } catch (err) {
                console.error("Error in transaction query: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        categoryStatistics: async (_, __, context) => {
            if (!context.getUser) {
                throw new Error("Unauthorized access");
            }
            const userId = await context.getUser()._id
            const transactions = await Transaction.find({ userId });
            const categoryMap = {}

            transactions.forEach(transaction => {
                if (!categoryMap[transaction.category]) {
                    categoryMap[transaction.category] = 0;
                }
                categoryMap[transaction.category] += transaction.amount;

            })

            return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }));
        },
    },
    Mutation: {
        createTransaction: async (_, { input }, context) => {
            console.log("Input received in createTransaction:", input);
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: await context.getUser()._id
                })
                await newTransaction.save();
                return newTransaction;
            } catch (err) {
                console.error("Error in createTransaction mutation: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        updateTransaction: async (_, { input }, context) => {
            try {
                const updtatedTransaction = await Transaction.findByIdAndUpdate(
                    input.transactionId, input, {
                    new: true,
                }
                )
                return updtatedTransaction;
            } catch (err) {
                console.error("Error in updateTransaction mutation: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        deleteTransaction: async (_, { transactionId }) => {
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId)
                return deletedTransaction;
            } catch (err) {
                console.error("Error in updateTransaction mutation: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    },

    Transaction :{
        user: async(parent) => {
            const userId = parent.userId;  // parent is the Transaction object

            try{
                const user = await user.findById(userId)
                return user;
            }catch(error){
                console.log("error in Transaction user:",error);
                throw new Error(error.message || "Internal server error");
            }
        }
    }
};

export default transactionResolver;