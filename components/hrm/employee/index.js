// our-domain.com/new-meetup

import NewEmployeeForm from "/components/meetups/NewEmployeeForm";

export default function Employee() {
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
