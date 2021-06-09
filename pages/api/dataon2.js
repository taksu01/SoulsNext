async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const fs = require("fs");
    const search = "components/views/client/" + data.link + "/index.js",
      pathCustom = "client/" + data.link,
      pathStandard = "hrm/" + data.link;
    fs.access(search, fs.F_OK, (err) => {
      if (err) {
        res.status(200).json({
          Result: "file not detected",
          content: pathStandard,
          custom: false,
        });
      } else {
        res
          .status(200)
          .json({ Result: "file detected", content: pathCustom, custom: true });
      }
    });
  }
}
export default handler;
