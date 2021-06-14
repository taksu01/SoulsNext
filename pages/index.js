import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { MongoClient } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import EmpList from "../components/meetups/EmpList";

export default function Home(props) {
  const router = useRouter();
  async function SF7Link(page) {
    // const response = await fetch("/api/dataon", {
    //   method: "POST",
    //   body: JSON.stringify(page),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await response.json();
    // router.push(data.path);
  }
  return (
    <div>
      <h1>SF7 Dynamic Routing </h1>
      <EmpList meetups={props.meetups} />
      {/* <ul>
        <li>
          <button onClick={() => SF7Link({ link: "employee" })}>
            Test 1 (Traditional)
          </button>
        </li>
        <Link href="/employee">
          <a>Test 2 (component)</a>
        </Link>
      </ul> */}
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

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://new-user:PccS7UhSiGdpKFWp@cluster0.l4ccl.mongodb.net/dummy?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("data1");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  var mysql = require("mysql");

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "coffee_valley",
  });

  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM bean", queryDes);
  });

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        details: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
const queryDes = (err, res, field) => {
  console.log(res);
};
