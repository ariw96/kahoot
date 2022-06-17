import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccount } from "../features/accounts/accountSlice";

function AccountForm() {
	const [text, setText] = useState("");

	const dispatch = useDispatch();
	const onSubmit = (e) => {
		if (text.length > 0) {
			e.preventDefault();
			dispatch(createAccount({ text }));
			setText("");
		}
	};
	return (
		<>
			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="text">account</label>
						<input
							type="text"
							name="text"
							id="text"
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<button type="submit" className="btn btn-block">
							Create Account
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default AccountForm;
