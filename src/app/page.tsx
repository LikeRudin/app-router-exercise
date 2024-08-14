import TweetList from "@/components/TweetList";
import AddTweet from "@/components/TweetUploadForm";
import dbClient from "@/lib/db";

export async function getInitialTweets() {
  const tweets = await dbClient.tweet.findMany({
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
    take: 3,
  });
  return tweets;
}

export default async function Home() {
  const tweets = await getInitialTweets();
  return (
    <main>
      <AddTweet />
      {
        //@ts-ignore
        <TweetList initialTweets={tweets} />
      }
    </main>
  );
}
