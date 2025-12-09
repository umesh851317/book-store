import { Suspense } from "react";
import BookInfo from "./BookInfo";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading Book Details...</div>}>
      <BookInfo />
    </Suspense>
  );
}
