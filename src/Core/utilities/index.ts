import axios from "axios";

const removeAccents = (str: string):string => {
    return str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '') || '';
}


export const filterFunction = (allText?: string | number, filter?: string | number) => {
    if (!filter || !allText) {
        return true;
    }

    filter = removeAccents(String(filter))
    allText = removeAccents(String(allText))

    if (allText.trim() == '' || filter.trim() == '') {
        return false
    }

    const filterString = filter.toLowerCase();
    const allTextString = allText.toLowerCase();

    const filterByIncludes = allTextString.includes(filterString)
    if (filterByIncludes) {
        return filterByIncludes
    }

    const filterNumber = Number(filter)
    const allTextNumber = Number(allText)

    if (filterNumber > 0 && allTextNumber > 0) {
        return filterNumber == allTextNumber
    }

    return false
};

export const fetchData = async (linkApi?: string) => {
    if (!linkApi) return []

    try {
        // await new Promise((resolve) => setTimeout(resolve, 9000));
        const response = await axios.get(linkApi);
        return response.data;
    } catch (error) {
        return []
    }
};