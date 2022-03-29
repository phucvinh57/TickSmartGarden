import { HStack, Box } from 'native-base';
import { useEffect, useMemo, useState } from 'react';
import Dots from 'react-native-dots-pagination';

export default function DotSliderList({ list, numItemsPerPage }) {
    const listLength = useMemo(() => {
        return Math.ceil(list.length / numItemsPerPage)
    }, [list, numItemsPerPage])
    const [pageNum, setPageNum] = useState(0)
    const [offset, setOffset] = useState(0)

    const [currItems, setCurrItems] = useState([])

    useEffect(() => {
        setCurrItems(list.slice(offset, numItemsPerPage))
    }, [pageNum, offset, numItemsPerPage])

    const pageChange = index => {
        console.log(index)
        setPageNum(index)
        setOffset(index * numItemsPerPage)
    }

    return <Box>
        <HStack space={numItemsPerPage} justifyContent='space-around'>
            {currItems}
        </HStack>
        <Dots
            length={listLength} active={pageNum}
            onScrollTo={pageChange}
        />
    </Box>
}