import { useState, useEffect } from 'react';
import DetailView from './DetailView';
import { Record } from '../../types';
interface getDataDto {
  list: Record[];
  selectedId: string;
}

const Home = () => {
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<Record[]>([]);

  const getData = () => {
    // get data from backend;
    const res = {
      data: {
        list: [],
        selectedId: ''
      }
    }; // await axio.get('');

    const { list, selectedId } = res.data as getDataDto;
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

  const storeId = (id: string) => {
    // store id => db
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    storeId(id);
  }, [id])

  return (
    <div className='flex'>
      <div className='w-3/5 h-full'>
        {data && data.length > 0 ?
          <table>
            <thead>
              <tr>
                <th>thumbnail</th>
                <th>score</th>
                <th>title</th>
                <th>author</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr className={"flex select-none cursor-pointer" + (item.id === id ? " selected" : "")} key={item.id}>
                  <td>
                    {
                      item.thumbnail && <img src={item.thumbnail} alt='thumbnail' className='w-5 h-5' />
                    }
                  </td>
                  <td>{item.score}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                </tr>
              ))}
            </tbody>
          </table> : <div>
            No Data
          </div>}
      </div>
      <div className='w-2/5 h-full'>
        <DetailView id={id} />
      </div>
    </div>
  )
}

export default Home;