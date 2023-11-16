import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface FormData {
    email: string;
    telegram: string;
    password: string;
}
const baseUrl = "http://localhost:8080";

const RegistrationForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
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
            await axios.post(`${baseUrl}/auth/register`, formData);
            navigate("/");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="telegram">
                <Form.Label>Telegram Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Telegram username"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3 w-100">
                Register
            </Button>
        </Form>
    );
};

export default RegistrationForm;
