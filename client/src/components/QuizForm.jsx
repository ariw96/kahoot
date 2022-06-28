import { useState } from "react";
import { useDispatch } from "react-redux";
import { createQuiz } from "../features/quizzes/quizSlice";

function QuizForm() {
	const [quizData, setQuizData] = useState({
		quizName: "",
		question: "",
		answerList: [
			{ name: "a", answer: "", isCorrect: false },
			{ name: "b", answer: "", isCorrect: false },
			{ name: "c", answer: "", isCorrect: false },
			{ name: "d", answer: "", isCorrect: false },
		],
	});

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createQuiz({ quizData }));
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
							value={quizData.quizName}
							onChange={(e) =>
								setQuizData({ ...quizData, quizName: e.target.value })
							}
						/>
						<label htmlFor="text">Enter Quiz question</label>
						<input
							type="text"
							name="text"
							id="text"
							value={quizData.question}
							onChange={(e) =>
								setQuizData({ ...quizData, question: e.target.value })
							}
						/>
						<label htmlFor="text">Enter Quiz question</label>
						<input
							type="text"
							name="text"
							id="text"
							value={quizData.question}
							onChange={(e) =>
								setQuizData({ ...quizData, question: e.target.value })
							}
						/>
						<div className="form-group">
							<button type="submit" className="btn btn-block">
								Create Quiz
							</button>
						</div>
					</div>
				</form>
			</section>
		</>
	);
}

export default QuizForm;
