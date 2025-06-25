import { major, rcompare, valid } from "semver";

// const TOKEN = process.env.GITHUB_TOKEN;

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

    const tags = await response.json();

    console.log("Tags:\n", tags);

    const latest_v0 = tags
      .map((r: any) => r.name)
      .map((tag: string) => (tag.startsWith("v") ? tag.slice(1) : tag))
      .filter((tag: string) => valid(tag) && major(tag) === 0)
      .sort(rcompare)[0];

    if (!latest_v0) {
      throw new Error("No valid v0.x.x release found!");
    }

    return latest_v0;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch/parse tags");
  }
};

const tag = await getLatestTag();
console.log("FINAL TAG VALUE: ", tag);
