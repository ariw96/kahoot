import { useState } from "react";
import { useDispatch } from "react-redux";
import { createQuiz } from "../features/quizzes/quizSlice";

function QuizForm() {
	const [text, setText] = useState("");

	const dispatch = useDispatch();
	const onSubmit = (e) => {
		if (text.length > 0) {
			e.preventDefault();
			dispatch(createQuiz({ text }));
			setText("");
		}
	};
	return (
		<>
			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="text">Enter Quiz name</label>
						<input
							type="text"
							name="text"
							id="text"
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<button type="submit" className="btn btn-block">
							Create Quiz
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default QuizForm;
