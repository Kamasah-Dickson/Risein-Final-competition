import { ConnectButton } from "@rainbow-me/rainbowkit";
const Header = () => {
	return (
		<div className="top-0 sticky left-0 w-full bg-[#ffffff07] p-3 flex items-center justify-end backdrop-blur-md">
			<ConnectButton />
		</div>
	);
};

export default Header;
