import dynamic from "next/dynamic";
import { checkCustom } from "../api/dataon2";
//let EmployeeC = dynamic(() => import("/components/views/hrm/employee"));
const __SERVER__ = "dataon1";
export default function EmployeePage(props) {
  const EmployeeC = dynamic(() =>
    import(`/client/${__SERVER__}/${props.content}`)
  );

  return (
    <>
      <EmployeeC></EmployeeC>
    </>
  );
}

export async function getServerSideProps() {
  // const response = await fetch("http://localhost:3000/api/dataon2", {
  //   method: "POST",
  //   body: JSON.stringify({ link: "employee" }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  const response = await checkCustom({ link: "employee" });
  const data = await response;
  return {
    props: {
      content: data.content,
      custom: data.custom,
    },
  };
}
