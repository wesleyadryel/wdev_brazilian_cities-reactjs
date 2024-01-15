import axios from 'axios';
import { Table } from 'flowbite-react';
import { useQuery, useQueryClient } from 'react-query'
import { cityProps, stateProps } from './types';
import { Suspense, useEffect, useState } from 'react';
import { fetchData, filterFunction } from './utilities';
import Loading from './LoadingComponent';
import InputComponent from './InputComponent';


const TableData = ({ filterText, state }: { filterText?: string | undefined, state?: string }) => {
  const linkApi = state && `https://brasilapi.com.br/api/ibge/municipios/v1/${state}?providers=dados-abertos-br,gov,wikipedia`

  // const queryClient = useQueryClient()
  const { data, isFetching, } = useQuery<cityProps[]>(['stateCities', state], () => fetchData(linkApi), {
    refetchOnWindowFocus: false,
    suspense: true,
    staleTime: 5000 * 60 // 5 min
  })


  return (
    <Table.Body className="divide-y">
      {
        data?.filter((e) => {
          return filterFunction(e?.nome, filterText) || filterFunction(e?.codigo_ibge, filterText)
        })?.map((state, index) => {
          return <Table.Row key={index}>
            <Table.Cell>{state?.nome}</Table.Cell>
          </Table.Row>
        })
      }
    </Table.Body>
  );
}


const CitiesElement = ({ state, label }: stateProps) => {
  const [filterText, setFilterText] = useState<string | undefined>(undefined)


  return <>
    <div className=' w-full h-full relative   '>
      <h3 className='font-extrabold'>Cidades de {label}</h3>
      <div className='h-modal w-full relative '>
        <div className='w-full h-10 mt-2 flex justify-center items-center mb-4  '>
          <span className='text-sm w-fit text-nowrap p-2 '>Pesquise uma cidade</span>
          <div className='w-full flex justify-start items-start '>
          <InputComponent
              onValueUpdate={(value) => {
                setFilterText(String(value))
              }}
              type="text"
              className='rounded-md h-3/6 w-11/12 !border-1 !border-gray-300 !border-solid '
            />
          </div>
        </div>

        <div className='h-modal w-full  absolute overflow-auto'>
          <Table hoverable={true} className='w-full  relative'>
            <Suspense fallback={<Loading />}>
              <Table.Head>
                <Table.HeadCell>Cidade</Table.HeadCell>
              </Table.Head>
              <TableData filterText={filterText} state={state} />
            </Suspense>
          </Table>
        </div>

      </div>
    </div >
  </>
}

export default CitiesElement