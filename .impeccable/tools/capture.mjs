// Settled full-page capture over the Chrome DevTools Protocol.
// Scrolls the whole page first so every `whileInView` reveal has fired, then
// returns to the top and screenshots — otherwise below-fold sections read as
// blank and a capture of half-animated text looks like a layout bug.

const [, , url, widthArg, heightArg, outFile] = process.argv;
const width = Number(widthArg || 1440);
const height = Number(heightArg || 900);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const version = await (await fetch("http://127.0.0.1:9222/json/version")).json();
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.addEventListener("open", res, { once: true });
  ws.addEventListener("error", rej, { once: true });
});

let id = 0;
const pending = new Map();
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
});

function send(method, params = {}, sessionId) {
  const msgId = ++id;
  return new Promise((resolve, reject) => {
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
  });
}

await send("Target.createTarget", { url: "about:blank" }).then(async ({ targetId }) => {
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  return { targetId, sessionId };
}).then(async (tab) => {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 600,
  }, tab.sessionId);

  await send("Page.enable", {}, tab.sessionId);
  await send("Runtime.enable", {}, tab.sessionId);
  await send("Page.navigate", { url }, tab.sessionId);
  await sleep(3500);

  // Settle every viewport-triggered reveal, then let springs finish.
  const scroll = await send(
    "Runtime.evaluate",
    {
      expression: `(async () => {
        const step = Math.round(window.innerHeight * 0.7);
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 120));
        }
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 400));
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 900));
        return document.body.scrollHeight;
      })()`,
      awaitPromise: true,
      returnByValue: true,
    },
    tab.sessionId,
  );

  const fullHeight = scroll.result?.value ?? height;

  const shot = await send(
    "Page.captureScreenshot",
    {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height: fullHeight, scale: 1 },
    },
    tab.sessionId,
  );

  const fs = await import("node:fs/promises");
  await fs.writeFile(outFile, Buffer.from(shot.data, "base64"));
  console.log(`${outFile} ${width}x${fullHeight}`);

  await send("Target.closeTarget", { targetId: tab.targetId });
});

ws.close();
process.exit(0);
