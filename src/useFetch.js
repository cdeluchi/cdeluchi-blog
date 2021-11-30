import { useState, useEffect } from "react";
//npx json-server  --watch data/db.json --port 8000
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(url, { signal: abortCont.signal })
            .then((res) => {
                if (!res.ok) {
                    throw Error("Something went wrong, did not find the blogs");
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                if (err.name === "AbortError") {
                    console.log("fetch abort");
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            });
        return () => {
            abortCont.abort();
        };
    }, [url]);
    return { data, isPending, error };
};

export default useFetch;
