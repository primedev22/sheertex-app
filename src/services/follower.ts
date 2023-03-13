import { Follower } from "../types/follower";
import { getLastPageFromLinkHeader } from "../utils/parse";

export const fetchFollowers = async (username: string): Promise<Follower[]> => {
  // Get total number of pages. One page consists of 30 followers at max.
  const res = await fetch(
    `https://api.github.com/users/${username}/followers`,
    {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`,
      },
    }
  );

  const linkHeader = res.headers.get("link");
  const lastPage = getLastPageFromLinkHeader(linkHeader);
  if (!lastPage) return await res.json();

  // Fetch all followers from all pages.
  const promises = [];
  for (let i = 1; i <= lastPage; i++) {
    promises.push(
      fetch(`https://api.github.com/users/${username}/followers?page=${i}`, {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`,
        },
      })
    );
  }
  const followerSubsetsJson = await Promise.all(promises);
  const followerSubsets = await Promise.all(
    followerSubsetsJson.map((subsetJson) => subsetJson.json())
  );
  const followers = followerSubsets.flat();

  return followers;
};
