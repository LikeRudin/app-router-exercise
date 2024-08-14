"use server";

import { z } from "zod";

import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const tweetSchema = z.object({
  tweetText: z.string({
    required_error: "tweet cannot be an empty post",
  }),
});

export async function uploadTweet(_: any, formData: FormData) {
  const data = {
    photo: formData.get("tweetText"),
  };

  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await dbClient.tweet.create({
        data: {
          tweetText: result.data.tweetText,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/tweets/${tweet.id}`);
    }
  }
}

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
