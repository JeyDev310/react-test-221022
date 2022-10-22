import { useState, useEffect } from 'react';
import DetailView from './DetailView';
import { Record } from '../../types';
import axios from 'axios';
interface getDataDto {
  list: Record[];
  selectedId: string;
}

const Home = () => {
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<Record[]>([]);

  const getData = async() => {
    const res = await axios.get('http://localhost:8000/articles');
    console.log(res);
    const { list, selectedId } = res.data as getDataDto;
    setData(list);
    let flag = true;
    list.map((item: Record) => {
      if (item.id === selectedId) {
        flag = false;
      }
    })
    if (flag) {
      setId(selectedId)
    } else {
      setId("");
    }
  }

  const storeId = async (selectId: string) => {
    setId(selectId);
    if (selectId) {
      await axios.put(`http://localhost:8000/articles/select/${selectId}`);
    } else {
      await axios.put(`http://localhost:8000/articles/unselect`);
    }
    
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    storeId(id);
  }, [id])

  const handleSelect = (selectId: string) => {
    if (selectId === id) {
      storeId("")
    } else {
      storeId(selectId)
    }
  }

  return (
    <div className='flex'>
      <div className='w-3/5 h-full p-10'>
        {data && data.length > 0 ?
          <table className='min-w-full border'>
            <thead className='border-b'>
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">thumbnail</th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">score</th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">title</th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">author</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr 
                  className={"border-b select-none cursor-pointer" + (item.id === id ? " selected" : "")} 
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                >
                  <td className='px-6'>
                    {
                      item.thumbnail && <img src={item.thumbnail} alt='thumbnail' className='w-10 h-10' />
                    }
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.score}</td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4'>{item.title}</td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.author}</td>
                </tr>
              ))}
            </tbody>
          </table> : <div>
            No Data
          </div>}
      </div>
      <div className='w-2/5 h-full p-10'>
        <DetailView id={id} />
      </div>
    </div>
  )
}

export default Home;