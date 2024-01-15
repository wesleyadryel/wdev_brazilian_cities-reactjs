import { Table } from "flowbite-react"


const Loading = () => {
    return <>
        <Table.Body>
            <Table.Row>
                <Table.Cell><p className='mt-4 text-center w-fit absolute left-2/4 right-2/4 -translate-x-2/4 font-extrabold '>Carregando...</p></Table.Cell>
            </Table.Row>
        </Table.Body>
    </>
}

export default Loading