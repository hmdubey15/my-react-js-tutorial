export const fetchJobIds = async () => {
  const url = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Job IDs fetch call failed!');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchJobMetaData = async (jobId: number) => {
    const url = `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Metadata fetch for job id ${jobId} failed!`);
        const data = await response.json();
        return data;
    } catch(err) {
        console.error(err);
        return null;
    }
}