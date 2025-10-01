import Card from "./card";
import { useQuery  } from "@apollo/client";
import { GET_TRANSACTIONS } from "../graphql/queries/transactions.query.js";
import { GET_USER_AND_TRANSACTIONS } from "../graphql/queries/user.query.js";

const Cards = () => {
	const { data, loading, error } = useQuery(GET_TRANSACTIONS);
	if (error) return <p>Error loading transactions: {error.message}</p>;
	if (loading) return <p>Loading transactions...</p>;

	const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);
	const{data:userAndTransactions} = useQuery(GET_USER_AND_TRANSACTIONS,{
		variables:{userId:authUser?.authUser?._id}
	})
	console.log("Transactions data:", data);
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{!loading && data.transactions.map((transaction) => (
					<Card key={transaction._id} transaction={transaction}
					authUser = {authUser?.authUser}
					/>
				))}
			</div>
			{!loading && data.transactions.length === 0 && (
				<p className='text-center text-gray-500'>No transactions found.</p>
			)}
		</div>
	);
};
export default Cards;