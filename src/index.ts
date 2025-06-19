export const getLatestTag = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.github.com/repos/wthrajat/tag-experiment/releases/latest');
    const data = await response.json();
    return data.tag_name;
  } catch (error) {
    console.error('Failed to fetch latest tag, falling back to default');
    return '0'
  }
};

const tag = await getLatestTag();
console.log("TAG VALUE: ", tag);