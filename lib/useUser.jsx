import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export default function useUser({
    redirectTo = "",
    redirectIfFound = false,
} = {}) {
   const address = `http://localhost:3000/api/user`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  
    const { data: user, mutate: mutateUser } = useSWR(address, fetcher);

    useEffect(() => {
        if (!redirectTo || !user) return;

        if (
            (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
            (redirectIfFound && user?.isLoggedIn)
        ) {
            Router.push(redirectTo);
        }
    }, [user, redirectIfFound, redirectTo]);

    return { user, mutateUser };
}
