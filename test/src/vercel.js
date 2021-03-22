const edgeHandlerPromise = import("./edge-handler");

export default async function handler(req, res) {
  const edgeHandler = (await edgeHandlerPromise).default;

  const html = await edgeHandler(req.body.component, req.body.props);

  res.setHeader("content-type", "text/html");
  res.send(html);
}
