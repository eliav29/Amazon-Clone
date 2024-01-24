import { useState } from "react";
import Title from "../Components/Shered/Title.jsx";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import Button from "react-bootstrap/esm/Button.js";
import { getError } from "../Utils.jsx";
import axios from "axios";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/users/signin", { email: email, password: password });
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/");
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
                    New customer? <Link to="/signup">Create your account</Link>
                </div>

                <div className="mb-3">
                    Forgot your password? <Link to="/forgot">Reset password</Link>
                </div>
            </Form>
        </Container>
    );
};

export default Signin;
