import { useState } from "react";
import "./Feedback.css";

function Feedback() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        rating: "",
        feedback: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        alert("Thank you for your feedback!");

        setFormData({
            name: "",
            email: "",
            rating: "",
            feedback: ""
        });

    };

    return (

        <
        div className = "feedback-page" >

        <
        div className = "feedback-container" >

        <
        h1 > 📝Feedback < /h1>

        <
        p >
        Help us improve the Smart Farmer Assistance Platform. <
        /p>

        <
        form onSubmit = { handleSubmit } >

        <
        input type = "text"
        name = "name"
        placeholder = "Enter Your Name"
        value = { formData.name }
        onChange = { handleChange }
        required /
        >

        <
        input type = "email"
        name = "email"
        placeholder = "Enter Your Email"
        value = { formData.email }
        onChange = { handleChange }
        required /
        >

        <
        select name = "rating"
        value = { formData.rating }
        onChange = { handleChange }
        required >
        <
        option value = "" >
        Select Rating <
        /option>

        <
        option value = "5" > ⭐⭐⭐⭐⭐Excellent <
        /option>

        <
        option value = "4" > ⭐⭐⭐⭐Good <
        /option>

        <
        option value = "3" > ⭐⭐⭐Average <
        /option>

        <
        option value = "2" > ⭐⭐Poor <
        /option>

        <
        option value = "1" > ⭐Very Poor <
        /option>

        <
        /select>

        <
        textarea name = "feedback"
        rows = "6"
        placeholder = "Write your feedback..."
        value = { formData.feedback }
        onChange = { handleChange }
        required /
        >

        <
        button type = "submit" >
        Submit Feedback <
        /button>

        <
        /form>

        <
        /div>

        <
        /div>

    );
}

export default Feedback;