async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const fs = require("fs");
    const search = "pages/dataon1/client/" + data.link + "/index.js",
      pathCustom = "dataon1/client/" + data.link,
      pathStandard = "dataon1/hrm/" + data.link;
    fs.access(search, fs.F_OK, (err) => {
      if (err) {
        res
          .status(200)
          .json({ Result: "file not detected", path: pathStandard });
      } else {
        res.status(200).json({ Result: "file detected", path: pathCustom });
      }
    });
  }
}
export default handler;
