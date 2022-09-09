import {useEffect, useState} from "react";
import CallsTable from "./components/CallsTable";
import {getCalls} from "../../../api/calls";
import {COUNT_ITEMS_ON_PAGE} from "../../../constants/default";
import PaginationTable from "../../../common/components/Pagination/Pagination";
import {BodyContainer, FooterContainer, HeaderContainer} from "../../../common/styled/containers/AdminContainer";


function Calls() {
    const [calls, setCalls] = useState([])
    const [callsOnShow, setCallsOnShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [countPages, setCountPages] = useState(1);

    useEffect(() => {
        const getData = async () => {
            try {
                const {data} = await getCalls()
                setCalls(data)
            } catch (e) {
                console.error(e)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        setCallsOnShow(getRoomsByPage(currentPage));
        setCountPages(getCountPages());
    }, [calls])

    const getRoomsByPage = (pageNumber) => {
        return calls.filter((_, i) => (i >= (pageNumber-1)*COUNT_ITEMS_ON_PAGE && i < pageNumber*COUNT_ITEMS_ON_PAGE))
    }

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setCallsOnShow(getRoomsByPage(pageNumber));
    }

    const getCountPages = () => {
        return Math.ceil(calls.length/COUNT_ITEMS_ON_PAGE);
    }


    return (
        <>
            <HeaderContainer>

            </HeaderContainer>
            <BodyContainer>
                <CallsTable calls={callsOnShow} />
            </BodyContainer>
            <FooterContainer>
                <PaginationTable countPages={countPages} currentPage={currentPage} onPageChange={onPageChange}/>
            </FooterContainer>
        </>
    );
}

export default Calls;
