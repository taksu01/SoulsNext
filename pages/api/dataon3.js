async function handler(req, res) {
  if (req.method === "POST") {
    res.status(200).json({
      content: `<h2>Hello</hello>`,
    });
  }
}
export default handler;
