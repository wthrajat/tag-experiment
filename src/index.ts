export const getLatestTag = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.github.com/repos/wthrajat/tag-experiment/releases/latest');
    const data = await response.json();
    const rawTag = data.tag_name;
    const cleanTag = rawTag.startsWith('v') ? rawTag.slice(1) : rawTag;
    return cleanTag;
  } catch (e) {
    console.error(e)
    throw new Error('Failed to fetch latest tag!');
  }
};

const tag = await getLatestTag();
console.log("TAG VALUE: ", tag);