"use client";

import { Tweet as TweetType, User as UserType } from "@prisma/client";
import { useState } from "react";
import { getTweets } from "@/app/actions";
import Tweet from "./Tweet";

type TweetDataType = TweetType & { user: UserType };

interface TweetListProps {
  initialTweets: TweetDataType[];
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newTweets = await getTweets(3, page + 1);
    if (newTweets.length !== 0) {
      setPage((prev) => prev + 1);
      if (page !== 0) {
        setIsFirstPage(false);
      }
      //@ts-ignore
      setTweets([...newTweets]);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };

  const onLoadBeforeClick = async () => {
    if (page < 1) {
      return;
    }
    if (page > 0) {
      setIsLoading(true);
      const newTweets = await getTweets(3, page - 1);
      if (newTweets.length !== 0) {
        setPage((prev) => prev - 1);
        if (page === 0) {
          setIsFirstPage(true);
        }
        //@ts-ignore
        setTweets((prev) => [...newTweets]);
        setIsLastPage(false);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 flex flex-col gap-5 bg-red-300">
      {(tweets as TweetDataType[]).map(
        ({ id, tweetText, createdAt, user: { name } }) => (
          <Tweet
            key={id}
            id={id}
            tweetText={tweetText}
            createdAt={createdAt.toDateString()}
            authorName={name}
          />
        )
      )}
      <div className="flex justify-between">
        {!isFirstPage ? (
          <button onClick={onLoadBeforeClick} disabled={isLoading}>
            {isLoading ? "로딩 중" : "이전"}
          </button>
        ) : (
          <div>`첫번째 페이지`</div>
        )}
        {!isLastPage ? (
          <button onClick={onLoadMoreClick} disabled={isLoading}>
            {isLoading ? "로딩 중" : "다음"}
          </button>
        ) : (
          <div>`마지막 페이지`</div>
        )}
      </div>
    </div>
  );
}
