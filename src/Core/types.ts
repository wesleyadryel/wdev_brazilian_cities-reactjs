

export interface brazilStatesProps {
    id: number,
    nome: string,
    regiao:
    { id: number, sigla: string, nome: string }
    sigla: string
}

export interface stateProps {
    state: string,
    label: string
}

export interface cityProps {
    nome: string,
    codigo_ibge: string
}

export type valueProps = string | readonly string[] | number | undefined