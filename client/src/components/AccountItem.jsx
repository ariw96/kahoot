import { useDispatch } from "react-redux";
import {
	deleteAccount,
	updateAccount,
} from "../features/accounts/accountSlice";
import { useNavigate } from "react-router-dom";

function AccountItem({ account }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onClick = (id, action) => {
		if (action === "deposit") {
		}
	};

	return (
		<div className="goal">
			<h3>Account name: {account.text}</h3>
			<h3>id: {account._id}</h3>
			<h3>Cash: {account.cash}</h3>
			<h3>Credit: {account.credit}</h3>
			<button
				onClick={() => dispatch(deleteAccount(account._id))}
				className="close"
			>
				X
			</button>
			<div className=" btn-actions">
				<button type="submit" className="btn ">
					Transfer
				</button>
				<button type="submit" className="btn ">
					Withdraw
				</button>
				<button onClick={onClick(account._id, "deposit")} className="btn ">
					Deposit
				</button>
			</div>
		</div>
	);
}

export default AccountItem;
