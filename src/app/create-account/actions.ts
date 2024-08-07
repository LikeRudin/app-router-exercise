"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "username은 반드시 문자열로 구성되어야 합니다.",
        required_error: "username을 입력해주세요",
      })
      .trim()
      .toLowerCase()
      .min(5, " 유저명은 5 글자 이상이어야 합니다.")
      .transform((username) => `🔥 ${username}`),
    email: z
      .string()
      .email()
      .refine((email) => email.endsWith("@zod.com"), {
        message: "오직 @zod.com 이메일만 사용할 수 있습니다.",
      }),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `비밀번호는  ${PASSWORD_MIN_LENGTH} 글자 이상이어야 합니다.`
      )
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `비밀번호는  ${PASSWORD_MIN_LENGTH} 글자 이상이어야 합니다.`
      ),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "비밀번호 두개가 일치하지 않습니다.",
        path: ["confirm_password"],
      });
    }
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten(),
    };
  } else {
    console.log(result.data);
    return {
      success: true,
      message: "계정이 성공적으로 생성되었습니다.,
    };
  }
};
