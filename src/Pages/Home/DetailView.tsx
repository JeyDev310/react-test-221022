import { useEffect, useState } from 'react';
import axios from 'axios';
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
    try {
      const res = await axios.get(`http://localhost:8000/articles/${id}`);
      if (res && res.data) {
        setData(res.data);
      } else {
        setData(null);
      }
    } catch(e) {
      console.log(e);
    }
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
    <div className="w-full min-h-[500px] border p-5">
      {loading ? <div>loading...</div> : <>
        {data ? <div>
          <img src={data.thumbnail} className='w-80 h-100 object-cover' />
          <div className='py-2'>
            <span className='font-bold'>score: </span>
            {data.score}
          </div>
          <div className='py-2'>
            <span className='font-bold'>title: </span>
            {data.title}
          </div>
          <div className='py-2'>
            <span className='font-bold'>author: </span>
            {data.author}
          </div>
          <div className='py-2'>
            <span className='font-bold'>num_comments: </span>
            {data.num_comments}
          </div>
          <div className='py-2'>
            <span className='font-bold'>url: </span>
            {data.url}
          </div>
        </div> : <>Unselected</>}
      </>}
    </div>
  )
}

export default DetailView;