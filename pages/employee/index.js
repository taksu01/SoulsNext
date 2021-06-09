import React, { lazy, Suspense } from "react";
import dynamic from "next/dynamic";
let EmployeeC = dynamic(() => import("/components/views/hrm/employee"), {
  ssr: false,
});

export default function EmployeePage(props) {
  console.log(props);
  let test = "employee";
  EmployeeC = dynamic(() => import(`/components/views/${props.content}`), {
    ssr: false,
  });

  return (
    <>
      <EmployeeC></EmployeeC>
    </>
  );
}

export async function getStaticProps() {
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
