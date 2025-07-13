import { useState } from "react";
import "./App.css";

type Field = "name" | "email" | "password" | "confirmPassword" | "gender";

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
}

interface IsValid {
    name: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    gender: boolean;
}

const errors: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
} = {
    name: "Name is required",
    email: "Email is not valid",
    password: "Password must be at least 6 characters",
    confirmPassword: "Passwords do not match",
    gender: "Please select your gender"
};

function App() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });

    const [isValid, setIsValid] = useState<IsValid>({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        gender: true
    });

    const [showPassword, setShowPassword] = useState<{
        password: boolean;
        confirmPassword: boolean;
    }>({ password: false, confirmPassword: false });

    const handleSetFormData = (
        event: React.ChangeEvent<HTMLInputElement>,
        field: Field
    ) => {
        setIsValid((prev) => ({ ...prev, [field]: true }));
        setFormData({ ...formData, [field]: event.target.value });
    };

    const handleValidationField = (): boolean => {
        const updatedIsValid: IsValid = {
            name: true,
            email: true,
            password: true,
            confirmPassword: true,
            gender: true
        };

        if (formData.name.length === 0) updatedIsValid.name = false;
        if (!/\S+@\S+\.\S+/.test(formData.email)) updatedIsValid.email = false;
        if (formData.password.length < 6) updatedIsValid.password = false;
        if (
            formData.confirmPassword !== formData.password ||
            formData.confirmPassword === ""
        )
            updatedIsValid.confirmPassword = false;
        if (formData.gender === "") updatedIsValid.gender = false;

        setIsValid(updatedIsValid);

        return Object.values(updatedIsValid).every(
            (condition: boolean) => condition === true
        );
    };

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isSuccess = handleValidationField();

        if (isSuccess) {
            alert(`
                Registration Successful
                Your account information:
                Name: ${formData.name}
                Email: ${formData.email}
                Password: ${formData.password}
                Gender: ${formData.gender}`);
        } else {
            alert("Registration failed");
        }
    };

    return (
        <div className="main">
            <div className="container">
                <h1 className="heading">Sign up</h1>
                <form
                    action=""
                    onSubmit={(event) => {
                        handleSubmitForm(event);
                    }}
                    className="form"
                    noValidate
                >
                    {/* name */}
                    <div className="form-group">
                        <label htmlFor="name" className="input-label">
                            Name
                        </label>
                        <div
                            className="input-wrapper"
                            style={{
                                borderColor: !isValid.name
                                    ? "#f04438"
                                    : "#0066FF"
                            }}
                        >
                            <span className="input-icon">
                                <i className="fa-solid fa-circle-user"></i>
                            </span>
                            <input
                                id="name"
                                type="text"
                                className="input-field"
                                autoComplete="off"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(event) => {
                                    handleSetFormData(event, "name");
                                }}
                            />
                            {!isValid.name && (
                                <span className="input-icon error-icon">
                                    <i className="fa-solid fa-circle-info"></i>
                                </span>
                            )}
                        </div>

                        {!isValid.name && (
                            <p className="error-message">{errors.name}</p>
                        )}
                    </div>
                    {/* email */}
                    <div className="form-group">
                        <label htmlFor="email" className="input-label">
                            Email
                        </label>
                        <div
                            className="input-wrapper"
                            style={{
                                borderColor: !isValid.email
                                    ? "#f04438"
                                    : "#0066FF"
                            }}
                        >
                            <span className="input-icon">
                                <i className="fa-solid fa-envelope"></i>
                            </span>
                            <input
                                id="email"
                                type="email"
                                className="input-field"
                                autoComplete="off"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(event) => {
                                    handleSetFormData(event, "email");
                                }}
                            />
                            {!isValid.email && (
                                <span className="input-icon error-icon">
                                    <i className="fa-solid fa-circle-info"></i>
                                </span>
                            )}
                        </div>

                        {!isValid.email && (
                            <p className="error-message">{errors.email}</p>
                        )}
                    </div>
                    {/* password */}
                    <div className="form-group">
                        <label htmlFor="password" className="input-label">
                            Create Password
                        </label>
                        <div
                            className="input-wrapper"
                            style={{
                                borderColor: !isValid.password
                                    ? "#f04438"
                                    : "#0066FF"
                            }}
                        >
                            <span className="input-icon">
                                <i className="fa-solid fa-lock"></i>
                            </span>
                            <input
                                id="password"
                                type={
                                    showPassword.password ? "text" : "password"
                                }
                                className="input-field"
                                autoComplete="off"
                                placeholder="Create password"
                                value={formData.password}
                                onChange={(event) => {
                                    handleSetFormData(event, "password");
                                }}
                            />
                            {isValid.password && (
                                <button
                                    type="button"
                                    className="input-icon password-icon"
                                    onClick={() => {
                                        setShowPassword({
                                            ...showPassword,
                                            password: !showPassword.password
                                        });
                                    }}
                                >
                                    <i className="fa-solid fa-eye"></i>
                                </button>
                            )}

                            {!isValid.password && (
                                <span className="input-icon error-icon">
                                    <i className="fa-solid fa-circle-info"></i>
                                </span>
                            )}
                        </div>

                        {!isValid.password && (
                            <p className="error-message">{errors.password}</p>
                        )}
                    </div>
                    {/* confirm password */}
                    <div className="form-group">
                        <label
                            htmlFor="confirmPassword"
                            className="input-label"
                        >
                            Confirm Password
                        </label>
                        <div
                            className="input-wrapper"
                            style={{
                                borderColor: !isValid.confirmPassword
                                    ? "#f04438"
                                    : "#0066FF"
                            }}
                        >
                            <span className="input-icon">
                                <i className="fa-solid fa-lock"></i>
                            </span>
                            <input
                                id="confirmPassword"
                                type={
                                    showPassword.confirmPassword
                                        ? "text"
                                        : "password"
                                }
                                className="input-field"
                                autoComplete="off"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(event) => {
                                    handleSetFormData(event, "confirmPassword");
                                }}
                            />
                            {isValid.confirmPassword && (
                                <button
                                    type="button"
                                    className="input-icon password-icon"
                                    onClick={() => {
                                        setShowPassword({
                                            ...showPassword,
                                            confirmPassword:
                                                !showPassword.confirmPassword
                                        });
                                    }}
                                >
                                    <i className="fa-solid fa-eye"></i>
                                </button>
                            )}

                            {!isValid.confirmPassword && (
                                <span className="input-icon error-icon">
                                    <i className="fa-solid fa-circle-info"></i>
                                </span>
                            )}
                        </div>

                        {!isValid.confirmPassword && (
                            <p className="error-message">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>
                    {/* gender */}
                    <div className="form-group">
                        <p className="input-label">Gender</p>
                        <div className="option-wrapper">
                            <div className="option-group">
                                <input
                                    name="gender"
                                    id="male"
                                    type="radio"
                                    value="male"
                                    checked={formData.gender === "male"}
                                    hidden
                                    onChange={(event) => {
                                        handleSetFormData(event, "gender");
                                    }}
                                />
                                <label htmlFor="male">
                                    <span className="custom-radio"></span>
                                    Male
                                </label>
                            </div>
                            <div className="option-group">
                                <input
                                    name="gender"
                                    id="female"
                                    type="radio"
                                    value="female"
                                    checked={formData.gender === "female"}
                                    hidden
                                    onChange={(event) => {
                                        handleSetFormData(event, "gender");
                                    }}
                                />
                                <label htmlFor="female">
                                    <span className="custom-radio"></span>
                                    Female
                                </label>
                            </div>
                            <div className="option-group">
                                <input
                                    name="gender"
                                    id="other"
                                    type="radio"
                                    value="other"
                                    checked={formData.gender === "other"}
                                    hidden
                                    onChange={(event) => {
                                        handleSetFormData(event, "gender");
                                    }}
                                />
                                <label htmlFor="other">
                                    <span className="custom-radio"></span>
                                    Other
                                </label>
                            </div>
                        </div>

                        {!isValid.gender && (
                            <p className="error-message">{errors.gender}</p>
                        )}
                    </div>
                    <button className="btn-submit">Signup</button>
                </form>
            </div>
        </div>
    );
}

export default App;
