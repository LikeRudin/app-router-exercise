"use server";

import dbClient from "@/lib/db";

export async function getTweets(
  tweetsNumberPerPage: number,
  currentPage: number
) {
  const skip = currentPage > 0 ? (currentPage - 1) * tweetsNumberPerPage : 0;
  const tweets = await dbClient.tweet.findMany({
    take: tweetsNumberPerPage,
    skip,
    select: {
      id: true,
      tweetText: true,
      createdAt: true,
      updatedAt: true,
      user: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return tweets;
}
