import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateQuotePage() {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [mediaUrl, setMediaUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleFileUpload = async () => {
        if (!file) {
            setError("Please select an image to upload.");
            return;
        }

        setUploading(true);
        setError("");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "https://crafto.app/crafto/v1.0/media/assignment/upload",
                formData
            );
            setMediaUrl(response.data[0].url);
        } catch (err) {
            setError("Image upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        if (!text || !mediaUrl) {
            setError("Please provide both quote text and an uploaded image.");
            return;
        }

        setSubmitting(true);
        setError("");
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "https://assignment.stage.crafto.app/postQuote",
                { text, mediaUrl },
                { headers: { Authorization: token, "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                alert("Quote created successfully!");
                navigate("/quotes");
            } else {
                setError("Failed to create the quote. Please try again.");
            }
        } catch (err) {
            setError("Failed to create the quote. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4 text-center">Create a Quote</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your quote text"
                    className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                ></textarea>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-4 w-full text-gray-700"
                />
                <button
                    onClick={handleFileUpload}
                    disabled={uploading}
                    className={`w-full mb-4 py-2 rounded ${
                        uploading
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    {uploading ? "Uploading..." : "Upload Image"}
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={submitting || !mediaUrl}
                    className={`w-full py-2 rounded ${
                        submitting
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                    {submitting ? "Creating..." : "Create Quote"}
                </button>
            </div>
        </div>
    );
}

export default CreateQuotePage;
