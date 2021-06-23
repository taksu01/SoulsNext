// our-domain.com/new-meetup
import { useRouter } from "next/router";
import NewEmployeeForm from "/components/meetups/cli_NewEmployeeForm";

export default function Employee() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/dataon3", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <>
      <h1>Custom Page</h1>
      <NewEmployeeForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export async function getStaticProps() {
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
    props: {},
    revalidate: 1,
  };
}
const queryDes = (err, res, field) => {
  console.log(res);
};
