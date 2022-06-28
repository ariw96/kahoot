import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuizForm from "../components/QuizForm";
import Spinner from "../utils/Spinner";
import { getQuizzes, reset } from "../features/quizzes/quizSlice";
import QuizItem from "../components/QuizItem";

function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { quizzes, isLoading, isError, message } = useSelector(
		(state) => state.quizzes
	);
	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (!user) {
			navigate("/login");
		}
		dispatch(getQuizzes());
		return () => {
			dispatch(reset());
		};
	}, [user, navigate, dispatch]);
	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<QuizForm />
			<section className="content">
				{quizzes.length > 0 ? (
					<div className="accounts">
						{quizzes.map((quiz) => (
							<QuizItem key={quiz._id} quizData={quiz} />
						))}
					</div>
				) : (
					<h3>You have not set any account</h3>
				)}
			</section>
		</>
	);
}
export default Dashboard;
