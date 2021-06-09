import React, { lazy, Suspense } from "react";
import dynamic from "next/dynamic";
// import EmployeeS from "../../component/standard/employee";
let EmployeeC = dynamic(() => import("/component/hrm/employee"), {
  ssr: false,
});
// const Employee = React.lazy(() =>
//   import(`../../component/client/employee`).catch(() => ({n
//     default: () => <div>Not found</div>,
//   }))
// );

export default function EmployeePage(props) {
  //const EmployeeC = dynamic(() => import(`${props.content}`), { ssr: false });
  EmployeeC = dynamic(() => import(`/component/${props.content}`), {
    ssr: false,
  });
  return (
    <>
      <h2>Test</h2>
      <EmployeeC></EmployeeC>
    </>
  );

  //   return <h2>test;</h2>;
}

export async function getStaticProps() {
  const response = await fetch("/api/dataon2", {
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
    },
  };
}
