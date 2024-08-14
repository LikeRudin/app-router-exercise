import { uploadTweet } from "@/app/actions";
import { useFormState } from "react-dom";

export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, null);

  return (
    <div>
      <form action={action} className="p-5 flex flex-col gap-5">
        <textarea
          name="tweetText"
          required
          className={state?.fieldErrors.tweetText ? "error" : ""}
        />
        <button>작성완료</button>
      </form>
    </div>
  );
}
