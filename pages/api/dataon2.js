export async function checkCustom(id) {
  const data = id;

  const fs = require("fs");
  const search = "client/dataon1/custom/" + data.link + "/index.js",
    pathCustom = "dataon1/custom/" + data.link,
    pathStandard = "dataon1/standard/" + data.link;

  let temp = {
    Result: "file not detected detected",
    content: pathStandard,
    custom: false,
  };
  console.log("Reach0", temp);
  try {
    if (fs.existsSync(search)) {
      console.log("Reach1", temp);
      temp = {
        Result: "file detected",
        content: pathCustom,
        custom: true,
      };
    }
  } catch (err) {
    console.log("Reach2", temp);
    temp = { Result: "file detected", content: pathStandard, custom: false };
  }

  // fs.access(search, fs.F_OK, (err) => {
  //   if (err) {
  //     temp = {
  //       Result: "file not detected",
  //       content: pathStandard,
  //       custom: false,
  //     };
  //     return;
  //   } else {
  //     temp = { Result: "file detected", content: pathCustom, custom: true };
  //   }
  // });
  console.log("The Temp", temp);
  return temp;
}

async function handler(req, res) {
  if (req.method === "POST") {
    const response = await checkCustom(req.body);
    res.status(200).json(response);
    // const data = req.body;
    // const fs = require("fs");
    // const search = "client/dataon1/custom/" + data.link + "/index.js",
    //   pathCustom = "custom/" + data.link,
    //   pathStandard = "standard/" + data.link;
    // fs.access(search, fs.F_OK, (err) => {
    //   if (err) {
    //     res.status(200).json({
    //       Result: "file not detected",
    //       content: pathStandard,
    //       custom: false,
    //     });
    //   } else {
    //     res
    //       .status(200)
    //       .json({ Result: "file detected", content: pathCustom, custom: true });
    //   }
    // });
  }
}
export default handler;
