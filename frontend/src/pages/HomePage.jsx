import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../components/Cards/";
import TransactionForm from "../components/TransactionForm";

import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transactions.query";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
	const { data } = useQuery(GET_TRANSACTION_STATISTICS);
	const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);
	
	
	const [chartData, setChartData] = useState(
		{
			labels: ["Saving", "Expense", "Investment"],
			datasets: [
				{
					label: "$",
					data: [],
					backgroundColor: [],
					borderColor: [],
					borderWidth: 1,
					borderRadius: 30,
					spacing: 10,
					cutout: 130
				},
			],
		}
	)

	useEffect(() => {
		if(data?.categoryStatistics){
			const categories = data.categoryStatistics.map((item) => item.category);
			const totalAmounts = data.categoryStatistics.map((item) => item.totalAmount);
			
			const backgroundColors = []
			const borderColors = []

			categories.forEach((category) => {
				if (category === "Saving") {
					backgroundColors.push("rgba(75, 192, 192, 0.6)");
					borderColors.push("rgba(75, 192, 192, 1)");
				} else if (category === "Expense") {
					backgroundColors.push("rgba(255, 99, 132, 0.6)");
					borderColors.push("rgba(255, 99, 132, 1)");
				} else if (category === "Investment") {
					backgroundColors.push("rgba(54, 162, 235, 0.6)");
					borderColors.push("rgba(54, 162, 235, 1)");
				}
			})
			setChartData(prev => ({
				labels: categories,
				datasets: [
					{
						...prev.datasets[0],
						data: totalAmounts,
						backgroundColor: backgroundColors,
						borderColor: borderColors
					}
				]
			}))
		}
	},[data])

	const [logout, { loading, client }] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthenticatedUser"],
	});

	
	console.log("Transaction statistics data:", data);

	const handleLogout = async () => {
		try {
			await logout()
			client.resetStore();
		} catch (error) {
			console.error("Logout failed", error);
			toast.error("Logout failed. Please try again.");
		}
	};


	return (
		<>
			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-center'>
					<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
						Spend wisely, track wisely
					</p>

					<img
						src={authUserData?.authUserData?.profilePicture}
						className='w-11 h-11 rounded-full border cursor-pointer'
						alt='Avatar'
					/>
					{!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer' onClick={handleLogout} />}
					{/* loading spinner */}
					{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
				</div>
				<div className='flex flex-wrap w-full justify-center items-center gap-6'>

					{data?.categoryStatistics?.length > 0 && (
						<div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
						<Doughnut data={chartData} />
					</div>
					)}
					

					<TransactionForm />
				</div>
				<Cards />
			</div>
		</>
	);
};
export default HomePage;