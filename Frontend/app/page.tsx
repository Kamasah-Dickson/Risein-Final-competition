import Header from "@/components/Header";

export default function Home() {
	return (
		<>
			{/* <Header /> */}
			<main className="bg flex items-center flex-col justify-center h-screen">
				<div>
					<h1 className="text-white font-bold text-4xl md:text-6xl">
						Welcome to the BNB Faucet <span className="text-blue-600">Pro</span>
					</h1>
					<p className="max-w-lg mx-auto text-center text-white mt-3">
						Your number one free BNB smartchain faucet, get 3 free BNB every
						hour. All you need is your BNB address
					</p>
				</div>
				<div className="flex mt-14 w-full max-w-md mx-auto">
					<input
						className="py-3 flex-[3] placeholder:text-sm px-5 w-full rounded-l-xl"
						type="text"
						placeholder="Input your BNB Chain address..."
					/>
					<button
						className="flex-[2] text-white active:scale-[1.01] transition-colors hover:opacity-70 bg-blue-700 p3-2 px-5 rounded-r-xl"
						type="button"
					>
						Give me BNB
						{/* <div className="loading"></div> */}
					</button>
				</div>
			</main>
		</>
	);
}
