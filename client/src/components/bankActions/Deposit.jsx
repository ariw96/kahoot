import { useState } from "react";
import { useDispatch } from "react-redux";

function Deposit() {
	const [deposit, setDeposit] = useState(0);

	const dispatch = useDispatch();
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch();
	};
	return (
		<>
			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="text">Enter cash amount </label>
						<input
							type="number"
							value={deposit}
							onChange={(e) => setDeposit(e.target.value)}
						/>
						<button type="submit" className="btn btn-block">
							Deposit Cash
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Deposit;
