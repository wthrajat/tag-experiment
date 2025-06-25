import { clean, rcompare, satisfies } from "semver";

// const TOKEN = process.env.GITHUB_TOKEN;

// For now, we're targetting major version 0
const TAG_MAJOR_VERSION = 3;

const getLatestMinorVersion = (
  rawTags: string[],
  majorVersion: number,
): string | undefined => {
  return rawTags
    .map((tag) => clean(tag))
    .filter(
      (tag): tag is string =>
        !!tag &&
        satisfies(tag, `>=${majorVersion}.0.0 <${majorVersion + 1}.0.0`),
    )
    .sort(rcompare)[0];
};

export const getLatestTag = async (): Promise<string> => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/wthrajat/tag-experiment/tags",
      {
        headers: {
          // Needed only for private repos
          //   'Authorization': `Bearer ${TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    const tagsResponse = await response.json();
    const rawTags = tagsResponse.map((r: any) => r.name);

    const latestMinor = getLatestMinorVersion(rawTags, TAG_MAJOR_VERSION);

    if (!latestMinor) {
      console.error(`No valid tag found for this version!`, {
        majorVersion: TAG_MAJOR_VERSION,
      });
      throw new Error(`No valid v${TAG_MAJOR_VERSION}.x.x release found!`);
    }

    console.log(
      `Using the latest tag for the major version = ${TAG_MAJOR_VERSION}: ${latestMinor}`,
    );

    return latestMinor;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch tag!");
  }
};

const tag = await getLatestTag();

console.log("FINAL TAG VALUE: ", tag);
