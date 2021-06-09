import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SFRoute() {
  const router = useRouter();
  useEffect(() => {
    router.push("../");
  }, []);

  return <h1>Test</h1>;
}

// export async function getStaticPaths(){

//     return{
//         fallback: false,
//         path
//     }
// }
// export async function getStaticProps(){

// }
