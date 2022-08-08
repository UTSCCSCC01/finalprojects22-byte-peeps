import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Loader from '../../Loader/Loader';
import NoData from '../../NoData/NoData';
import WordCloud from './WordCloud';
import useWordCloudDashboard from './WordCloudDashboardHook';

const CommentsWordCloud = () => {
  const { data, isLoading, error } = useWordCloudDashboard();

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  if (!data || data.length === 0) return <NoData />;
  else
    return (
      <WordCloud data={data} isLoading={isLoading} error={error}></WordCloud>
    );
};

export default CommentsWordCloud;
