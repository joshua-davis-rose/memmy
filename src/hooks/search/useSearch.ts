import { CommunityView } from "lemmy-js-client";
import React, { SetStateAction, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { lemmyAuthToken, lemmyInstance } from "../../LemmyInstance";
import { handleLemmyError } from "../../helpers/LemmyErrorHelper";

interface UseSearch {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  trending: CommunityView[];
}

const useSearch = (): UseSearch => {
  const [query, setQuery] = useState<string>("");
  const [trending, setTrending] = useState<CommunityView[]>([]);

  useFocusEffect(
    useCallback(() => {
      doGetTrending().then();
    }, [])
  );

  const doGetTrending = useCallback(async () => {
    try {
      const res = await lemmyInstance.listCommunities({
        auth: lemmyAuthToken,
        sort: "Active",
        limit: 5,
      });

      setTrending(res.communities);
    } catch (e) {
      handleLemmyError(e.toString());
    }
  }, []);

  return {
    query,
    setQuery,

    trending,
  };
};

export default useSearch;
