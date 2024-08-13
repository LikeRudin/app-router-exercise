import Link from "next/link";
import Image from "next/image";

interface TweetProps {
  createdAt?: string;
  authorName?: string;
  avatarString?: string;
  tweetText: string;
  id: number;
}

const Tweet = ({
  createdAt,
  authorName,
  avatarString,
  tweetText,
  id,
}: TweetProps) => {
  return (
    <div className="flex w-inherit max-w-screen-xl p-4 border-t border-black">
      <div className="flex-none w-1/10 h-16 relative mr-4">
        {avatarString ? (
          <Image
            className="rounded-full object-cover"
            src={`/${avatarString}`} // Correct path
            alt="AvatarImage"
            fill
            sizes="64px" // Ensures correct size handling
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full">
            사진없음
          </div>
        )}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <span className="font-bold">{authorName}</span>
          <span className="text-gray-500">{createdAt}</span>
        </div>
        <div className="mt-2">{tweetText}</div>
      </div>
      <div>
        <Link className="flex-none w-4 h-4" href={`/tweet/${id}`} passHref>
          상세보기
        </Link>
      </div>
    </div>
  );
};

export default Tweet;
