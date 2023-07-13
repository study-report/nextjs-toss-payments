"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  return <div>{searchParams.get("amount")}원 결제 완료요 ㅋ</div>;
}
