import { useDispatch } from "react-redux";
import { deleteAccount } from "../features/accounts/accountSlice";

function AccountItem({ account }) {
	const dispatch = useDispatch();

	return (
		<div className="goal">
			<div>{new Date(account.createdAt).toLocaleString("en-US")}</div>
			<h2>{account.text}</h2>
			<button
				onClick={() => dispatch(deleteAccount(account._id))}
				className="close"
			>
				X
			</button>
		</div>
	);
}

export default AccountItem;
