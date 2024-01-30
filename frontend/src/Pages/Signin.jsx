import { useContext, useEffect, useState } from "react";
import Title from "../Components/Shered/Title.jsx";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import Button from "react-bootstrap/esm/Button.js";
import { getError } from "../utils.jsx";
import axios from "axios";
import { Store } from "../store.jsx";
import { USER_SIGNIN } from "../Reducers/Actions.jsx";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {search} = useLocation();
    const redirectUrl = new URLSearchParams(search);
    const redirectValue = redirectUrl.get('redirect');
    const redirect = redirectValue ? redirectValue : "/";
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;
    
    useEffect(() => {
      if(userInfo)
        navigate(redirect)
    }, [navigate, redirect, userInfo])
    

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/users/signin", { email: email, password: password });
            ctxDispatch({type: USER_SIGNIN, payload: data});
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate(redirect);
        } catch (error) {
            toast.error(getError(error));
        }
    };

    return (
        <Container className="small-container">
            <Title title="Signin page" />
            <h1 className="my-3">Signin</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control required onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control required onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Sign In</Button>
                </div>

                <div className="mb-3">
                    New customer? <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                </div>

                <div className="mb-3">
                    Forgot your password? <Link to="/forgot">Reset password</Link>
                </div>
            </Form>
        </Container>
    );
};

export default Signin;
