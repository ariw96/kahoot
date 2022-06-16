import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/");
	};
	return (
		<header className="header">
			<div className="logo">
				<NavLink to="/">GoalSetter</NavLink>
			</div>
			<ul>
				{user ? (
					<li>
						<button className="btn" onClick={onLogout}>
							<FaSignOutAlt /> Logout
						</button>
					</li>
				) : (
					<>
						<li>
							<NavLink to="/login">
								<FaSignInAlt /> Login
							</NavLink>
						</li>
						<li>
							<NavLink to="/register">
								<FaUser /> Register
							</NavLink>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}

export default Header;
