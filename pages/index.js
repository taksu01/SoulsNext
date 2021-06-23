import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { MongoClient } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import EmpList from "../components/meetups/EmpList";
import { useTranslation } from "react-i18next";
import { Z_FIXED } from "zlib";
import path from "path";
import getConfig from "next/config";

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
      <h1>{t("title.head1")}</h1>
      <h1>{t("title.head2")}</h1>
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
const serverPath = (staticFilePath) => {
  return path.join(
    getConfig().serverRuntimeConfig.PROJECT_ROOT,
    staticFilePath
  );
};
export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://new-user:PccS7UhSiGdpKFWp@cluster0.l4ccl.mongodb.net/dummy?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("data1");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  const posts = {
    notFound: true,
  };
  console.log(serverPath("/locales/en/translation.json"));
  const fs = require("fs");
  const fileName = serverPath("public/locales/en/translation.json");
  let file;
  try {
    if (fs.existsSync(fileName)) {
      console.log("Exist");
      //file = require(fileName);
      let content = JSON.parse(fs.readFileSync(fileName, "utf8"));
      content.title.head1 = content.title.head1 + "a";
      fs.writeFileSync(fileName, JSON.stringify(content));
    }
  } catch (err) {
    console.log("Dont exist");
    console.log(err);
  }

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
