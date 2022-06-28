import { useDispatch } from "react-redux";
import { deleteQuiz, updateQuiz } from "../features/quizzes/quizSlice";

function QuizItem({ quizData }) {
	const dispatch = useDispatch();
	console.log(quizData);

	return (
		<div className="goal">
			<h3>Quiz name: {quizData.quizName}</h3>
			<h3>question: {quizData.question}</h3>
			<h3>id: {quizData._id}</h3>
			<button
				onClick={() => dispatch(deleteQuiz(quizData._id))}
				className="close"
			>
				X
			</button>
		</div>
	);
}

export default QuizItem;
