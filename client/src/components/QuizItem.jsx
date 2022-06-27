import { useDispatch } from "react-redux";
import { deleteQuiz, updateQuiz } from "../features/quizzes/quizSlice";
import { useNavigate } from "react-router-dom";

function QuizItem({ quiz }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className="goal">
			<h3>Quiz name: {quiz.text}</h3>
			<h3>id: {quiz._id}</h3>
			<button onClick={() => dispatch(deleteQuiz(quiz._id))} className="close">
				X
			</button>
		</div>
	);
}

export default QuizItem;
