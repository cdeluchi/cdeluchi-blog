import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("Clarice");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(blog),
        }).then(() => {
            console.log("new blog add");
            setIsPending(false);
            // history.go(-1);
            history.push("/");
        });
    };

    return (
        <div className="create">
            <h2>Create a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog title:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Clarice">Clarice</option>
                    <option value="Flocke">Flocke</option>
                </select>
                {!isPending && <button>Add blog</button>}
                {isPending && <button disabled>Add blog...</button>}
            </form>
        </div>
    );
};

export default Create;
