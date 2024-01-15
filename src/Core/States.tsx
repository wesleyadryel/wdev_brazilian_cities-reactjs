import axios from 'axios';
import { Table } from 'flowbite-react';
import { useQuery, useQueryClient } from 'react-query'
import { brazilStatesProps, stateProps } from './types';
import { Suspense, useEffect, useState } from 'react';
import { fetchData, filterFunction } from './utilities';
import Loading from './LoadingComponent';
import InputComponent from './InputComponent';

type stateActionProps = (state: stateProps) => void

const TableData = ({ filterText, setState }: { filterText?: string | undefined, setState: stateActionProps }) => {
  const linkApi = 'https://brasilapi.com.br/api/ibge/uf/v1'

  // const queryClient = useQueryClient()
  const { data, isFetching, } = useQuery<brazilStatesProps[]>(['brazilStates'], () => fetchData(linkApi), {
    refetchOnWindowFocus: false,
    suspense: true,
    staleTime: 5000 * 60 // 5 min
  })


  return (
    <Table.Body className="divide-y">
      {
        data?.filter((e) => {
          return filterFunction(e?.regiao?.nome, filterText) || filterFunction(e?.regiao?.sigla, filterText) || filterFunction(e?.sigla, filterText) || filterFunction(e?.nome, filterText) || filterFunction(e?.id, filterText)
        })?.map((state, index) => {
          return <Table.Row key={index}>
            <Table.Cell>{state?.sigla}</Table.Cell>
            <Table.Cell>{state?.nome}</Table.Cell>
            <Table.Cell>{state?.regiao?.nome}</Table.Cell>
            <Table.Cell>
              <button
                onClick={() => {
                  state?.sigla && setState({ state: state.sigla, label: state.nome })
                }}>
                Listar Cidades</button>
            </Table.Cell>
          </Table.Row>
        })
      }
    </Table.Body>
  );
}


const StateElement = ({ setState }: { setState: stateActionProps }) => {
  const [filterText, setFilterText] = useState<string | undefined>(undefined)


  return <>
    <div className=' w-full h-full relative   '>
      <h3 className='font-extrabold h-fit'>Estados Brasileiros</h3>
      <div className='h-modal w-full relative '>

        <div className='w-full h-10 mt-2 flex justify-center items-center mb-4   '>
          <span className='text-sm w-fit text-nowrap p-2 '>Pesquise um estado</span>
          <div className='w-full flex justify-start items-start '>
            <InputComponent
              className='rounded-md h-3/6 w-11/12 !border-1 !border-gray-300 !border-solid '
              type="text"
              onValueUpdate={(value) => {
                setFilterText(String(value)) 
              }}
            />
          </div>
        </div>

        <div className='h-modal w-full  absolute overflow-auto'>
          <Table hoverable={true} className='w-full  relative'>
            <Suspense fallback={<Loading />}>
              <Table.Head>
                <Table.HeadCell>Sigla</Table.HeadCell>
                <Table.HeadCell>Nome</Table.HeadCell>
                <Table.HeadCell>Região</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <TableData setState={setState} filterText={filterText} />
            </Suspense>
          </Table>
        </div>

      </div>


    </div >
  </>
}

export default StateElement