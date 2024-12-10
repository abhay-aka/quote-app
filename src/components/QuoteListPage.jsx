import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function QuoteListPage() {
    const [quotes, setQuotes] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchQuotes = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `https://assignment.stage.crafto.app/getQuotes?limit=20&offset=${offset}`,
                { headers: { Authorization: token } }
            );
            console.log('got response from quotelist', response);
            if (response.data.data.length === 0) setHasMore(false);
            else setQuotes((prev) => [...prev, ...response.data.data]);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, [offset]);

    return (
        <div className="p-4 relative min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quotes.map((quote) => (
                    <div key={quote.mediaUrl} className="bg-white rounded shadow overflow-hidden">
                        <img src={quote.mediaUrl} alt="quote" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <p className="font-semibold">{quote.text}</p>
                            <div className="text-sm text-gray-500 mt-2">
                                <span>By: {quote.username}</span>
                                <br />
                                <span>{new Date(quote.createdAt).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {hasMore && (
                <button
                    onClick={() => setOffset(offset + 20)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Load More
                </button>
            )}
            {/* Floating "Create Quote" Button */}
            <Link
    to="/create-quote"
    className="fixed top-4 px-5 right-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
>
    Create Quote
</Link>

        </div>
    );
}

export default QuoteListPage;
