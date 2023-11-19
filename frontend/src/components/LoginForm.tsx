import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../types";
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            if (response.status === 200) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
                <FloatingLabel label="Email">
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
                <FloatingLabel label="Password">
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </FloatingLabel>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;
