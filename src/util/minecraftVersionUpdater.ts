import { rmSync, appendFileSync, writeFileSync } from "fs";

const minecraftVersionsJson = "minecraftVersionsData.json";
const versionManifestURL =
  "https://launchermeta.mojang.com/mc/game/version_manifest.json";

type Version = {
  id: string; // Version number
  type: string;
  url: string;
  time: string;
  releaseTime: string;
};

type VersionManifest = {
  latest: {
    release: string;
    snapshot: string;
  };
  versions: Version[];
};

export default async function update(): Promise<void> {
  // Remove the existing file to recreate it
  rmSync(minecraftVersionsJson, { force: true });

  // Write the opening bracket for the JSON array
  writeFileSync(minecraftVersionsJson, "[\n", "utf-8");

  const response = await fetch(versionManifestURL);
  const result = (await response.json()) as VersionManifest;

  const versionCount = result.versions.length;

  let i = 0;
  let firstWritten = false; // Track if it's the first valid version

  for (const version of result.versions) {
    i++;
    console.log(`Version ${i} of ${versionCount}...`);

    const versionResponse = await fetch(version.url);
    const versionData = await versionResponse.json();

    if (!versionData.downloads?.server) {
      continue;
    }

    const versionInfo = {
      version: versionData.id,
      url: versionData.downloads.server.url,
      type: versionData.type
    };

    // Append a comma if it's not the first valid version
    if (firstWritten) {
      appendFileSync(minecraftVersionsJson, ",\n", "utf-8");
    }

    appendFileSync(
      minecraftVersionsJson,
      JSON.stringify(versionInfo, null, 2),
      "utf-8"
    );

    firstWritten = true; // Mark that a valid version has been written
  }

  // Write the closing bracket for the JSON array
  appendFileSync(minecraftVersionsJson, "\n]\n", "utf-8");

  console.log("All versions written to minecraftVersionsData.json");
}
