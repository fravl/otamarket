import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RegistrationFormData } from "../types";
import { register } from "../services/AuthService";

const RegistrationForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<RegistrationFormData>({
        email: "",
        telegram: "",
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
            await register(formData);
            navigate("/");
        } catch (error) {
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
            <Form.Group controlId="telegram" className="mb-3">
                <FloatingLabel label="Telegram Username">
                    <Form.Control
                        type="text"
                        placeholder="Enter Telegram username"
                        name="telegram"
                        value={formData.telegram}
                        onChange={handleChange}
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
                Register
            </Button>
        </Form>
    );
};

export default RegistrationForm;
