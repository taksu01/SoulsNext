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
      <NewEmployeeForm onAddMeetup={addMeetupHandler} />
    </>
  );
}
