import { useEffect, useState } from "react";

const useFetch = url => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(results => {
                setIsPending(false);
                setData(results);
            })
            .catch((err) => {
                setIsPending(false);
                setError(err.message);
            });
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;