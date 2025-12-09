'use client'
import HomeCompo1 from "@/components/homeCompo1/HomeCompo1";
// import SimilarBook from "@/components/SimilarBook/SimilarBook";
import dynamic from "next/dynamic";

const SimilarBook = dynamic(
  () => import("@/components/SimilarBook/SimilarBook"),
  { loading: () => <div className="spinner"></div> }
);
export default function Home() {
  return (
    <main className="home">
      <div style={{ borderBottom: "1px solid gray", width: "100%" }}>
        <HomeCompo1 />
      </div>
      <div style={{ width: "100%" }}>
        <div className='similarBook'>
          <h1>crime</h1>
          <SimilarBook Category={"Crime"} />
        </div>
        <hr />
        <div className='similarBook'>
          <h1>Programming</h1>
          <SimilarBook Category={"Programming"} />
        </div>
        <hr />
        <div className='similarBook'>
          <h1>History</h1>
          <SimilarBook Category={"History"} />
        </div>
        <hr />
        <div className='similarBook'>
          <h1>Financial Education</h1>
          <SimilarBook Category={"Financial Education"} />
        </div>
        <hr />
        <div className='similarBook'>
          <h1>General Knowledge</h1>
          <SimilarBook Category={"General Knowledge"} />
        </div>
        <hr />
        <div className='similarBook'>
          <h1>Health</h1>
          <SimilarBook Category={"Health"} />
        </div>
        <hr />
      </div>
    </main>
  );
}
