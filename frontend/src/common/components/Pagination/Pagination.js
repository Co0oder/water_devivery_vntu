import React, { useEffect, useState } from "react";
import Container from "./styled/Container";
import Item from './styled/Item'


function PaginationTable({countPages, currentPage, onPageChange}) {
    const [pages, setPages] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if(countPages){
            setPages(range(1, countPages > 3 ? countPages-1 : countPages))
        }
    }, [countPages]);

    const onChangePage = (page) => {
        console.log('page', countPages)
        if(page <= countPages && page >= 1){
            onPageChange(page)
        }
    }

    const range = (start, end) => {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    return (
        <Container>
            {
                pages.map((page) => {
                    if(!showAll && page > 3) return

                    return <Item
                        key={page}
                        first={page === 1}
                        last={page === countPages}
                        active={page === currentPage}
                        onClick={() => onChangePage(page)}
                    >{page}
                    </Item>;
                })
            }
            {
                (countPages > 4 && !showAll) ?
                    <Item
                        key='...'
                        onClick={() => setShowAll(true)}
                    >...
                    </Item>
                    :
                    ''
            }
            {
                countPages > 3 ?
                    <Item
                        key={countPages}
                        last
                        active={countPages === currentPage}
                        onClick={() => onChangePage(countPages)}
                    >{countPages}
                    </Item>
                    :
                    ''
            }
        </Container>
    )
}

export default PaginationTable;
