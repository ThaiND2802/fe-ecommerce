import fetch from "node-fetch";

const FIGMA_TOKEN = 'figd_r-uLnUzL-rJ94cq0y7mJPAhgE-xDPFZMNKmupfPi'

const fileKey = process.argv[2];
const nodeId = process.argv[3];

if (!fileKey || !nodeId) {
  console.error("Usage: node cli.js <fileKey> <nodeId>");
  process.exit(1);
}

async function run() {
  const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${nodeId}`;

  const res = await fetch(url, {
    headers: {
      "X-Figma-Token": FIGMA_TOKEN,
    },
  });

  const data = await res.json();

  console.log(JSON.stringify(data));
}

run();