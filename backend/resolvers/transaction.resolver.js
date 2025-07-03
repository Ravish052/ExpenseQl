const transactionResolver = {
    Query: {
        transactions: async (_, __, context) => {
            try {
                if (!context.user) {
                    throw new Error("Unauthorized access");
                }
                const userId = await context.getUser()._id

                const transactions = await context.db.Transaction.find({ userId }).sort({ createdAt: -1 });
                return transactions;
            } catch (err) {
                console.error("Error in transactions query: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        transaction: async (_, { transactionId },) => {
            try {
                const transaction = await transaction.findById(transactionId);
                return transaction;
            } catch (err) {
                console.error("Error in transaction query: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    },
    Mutation: {
        createTransaction: async (_, { input }, context) => {
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
        deleteTransaction: async (parent, args, context) => { 
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId)
                    return deletedTransaction;
            } catch (err) {
                console.error("Error in updateTransaction mutation: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    }
}

export default transactionResolver;