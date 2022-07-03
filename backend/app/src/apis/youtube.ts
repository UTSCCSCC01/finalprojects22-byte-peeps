import axios from 'axios';

export const getChannelName = async (
  channelId: string
): Promise<string | null> => {
  const apiKey = process.env.YOUTUBE_API_KEY ?? '';
  const result = await axios
    .get(
      'https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=' +
        channelId +
        '&key=' +
        apiKey
    )
    .catch(() => null);
  return result?.data?.items
    ? result.data.items[0].brandingSettings.channel.title
    : null;
};
