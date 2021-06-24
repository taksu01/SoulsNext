import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { MongoClient } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import EmpList from "../components/meetups/EmpList";
import { useTranslation } from "react-i18next";
import path from "path";
import getConfig from "next/config";
import { getTranslationLanguage } from "./api/translation";
//import { runTranslationChecking } from "./api/translation";
let timestamp = 0;
export default function Home(props) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div>
      <button onClick={() => changeLang("en")}>EN</button>
      <button onClick={() => changeLang("id")}>ID</button>
      <h1>{t("title")}</h1>
      <h1>{t("title")}</h1>
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

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://new-user:PccS7UhSiGdpKFWp@cluster0.l4ccl.mongodb.net/dummy?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("data1");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  const data = await getTranslationLanguage("en", 0);
  //timestamp = data.timestamp;
  //runTranslationChecking();
  // setInterval(function () {
  //   let update = getTranslationLanguage("en", 1, timestamp);

  //   setTimeout(function () {
  //     console.log(update);
  //     if (update != false || update != undefined) timestamp = update.timestamp;
  //   }, 5000);
  // }, 10000);
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
    revalidate: 1000,
  };
}
