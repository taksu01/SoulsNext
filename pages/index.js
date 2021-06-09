import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  async function SF7Link(page) {
    const response = await fetch("http://localhost:3000/api/dataon", {
      method: "POST",
      body: JSON.stringify(page),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.push(data.path);
  }
  return (
    <div>
      <h1>SF7 Dynamic Routing </h1>
      <ul>
        <li>
          <button onClick={() => SF7Link({ link: "employee" })}>
            Test 1 (Traditional)
          </button>
        </li>
        <Link href="/employee">
          <a>Test 2 (component)</a>
        </Link>
      </ul>
    </div>
  );
}

// export async function getStaticProps() {
//   return {
//     props: {
//       res: (),
//     },
//   };
// }
