import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const container = __non_webpack_require__("../.container/server/test");

const initContainerPromise = Promise.resolve(
  __webpack_init_sharing__("default")
).then(() => container.init(__webpack_share_scopes__.default));

export default async function edgeHandler(component, props) {
  await initContainerPromise;

  const factory = await container.get(component);
  const mod = factory();
  const Component = (mod && mod.default) || mod;

  const html = renderToStaticMarkup(<Component {...props} />);

  return html;
}
