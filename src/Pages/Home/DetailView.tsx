import { useEffect, useState } from 'react';

interface DetailRecord {
  id: string;
  thumbnail: string;
  score: number;
  title: string;
  author: string;
  num_comments: number;
  url: string;
}

const DetailView = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | DetailRecord>(null);

  const getDetail = async (id: string) => {
    setLoading(true);

    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      getDetail(id);
    } else {
      setData(null);
    }

  }, [id])

  return (
    <div className="w-full h-full">
      {loading ? <div>loading...</div> : <>
        {data ? <div>
          <img />
          <div>score: {data.score}</div>
          <div>title: {data.title}</div>
          <div>author: {data.author}</div>
          <div>num_comments: {data.num_comments}</div>
          <div>url: {data.url}</div>
        </div> : <>No selection</>}
      </>}
    </div>
  )
}

export default DetailView;