import dynamic from "next/dynamic";
//let EmployeeC = dynamic(() => import("/components/views/hrm/employee"));

export default function EmployeePage(props) {
  const EmployeeC = dynamic(() => import(`/components/views/${props.content}`));

  return (
    <>
      <EmployeeC></EmployeeC>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/dataon2", {
    method: "POST",
    body: JSON.stringify({ link: "employee" }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return {
    props: {
      content: data.content,
      custom: data.custom,
    },
  };
}
