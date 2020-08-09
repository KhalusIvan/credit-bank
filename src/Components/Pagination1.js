import React, { useState, useEffect, useContext } from 'react';
import Pager from 'react-pager';
import Spiner from './Spiner';
import '../style/Pagination.css';
import User from '../Contexts/User';
export default (props) => {
    const [totalPages, setTotalPages] = useState(props.totalPages);
    const [currentPage, setCurrentPage] = useState(props.currentPage);
    const [visiblePages, setVisiblePages] = useState(props.visiblePages);
    const [dataArray, setDataArray] = useState(props.externalArray ? props.externalArray : []);
    const { user } = useContext(User);
    function handlePageChanged(newPage) {
        setCurrentPage(newPage);
        if (!dataArray[newPage] || dataArray[newPage].status === 'rejected') {
            fetchData(newPage);
        }
    }
    function refreshDataArray(index, newData,oldArray) {
        const newArray = dataArray.slice();
        newArray[index] = newData;
        console.log(oldArray);
        setDataArray(newArray);
        if(props.setExternalArray)
            props.setExternalArray(newArray);
    }
    function assignObjectsOfArrays(targetArray, sourceArray) {
        if (targetArray.length !== sourceArray.length)
            throw new Error('Incorrect data!');
        let indexIterator = 0;
        for (let object of sourceArray) {
            targetArray[indexIterator] = Object.assign(targetArray[indexIterator], object);
            indexIterator++;
        }
        return targetArray;
    }
    async function fetchData(numberOfPage) {
        let newDataArray = [];
        refreshDataArray(numberOfPage, { status: 'pending' },dataArray);
        for (let fetchPath of props.fetchArray) {
            try {
                console.log(fetchPath);
                const resp = await fetch(fetchPath, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + props.token
                    },
                    body: JSON.stringify({
                        'group': numberOfPage,
                        'number': props.numberOfItemsOnPage
                    })
                });
                if (resp.status >= 400 && resp.status < 500)
                    throw new ReferenceError('Error to fetch ' + fetchPath);
                const json = await resp.json();
                if (!Array.isArray(json))
                    throw new TypeError('Incorect data. Data must be Array');
                if (newDataArray.length === 0) {
                    newDataArray =  json;
                }
                else {
                    newDataArray = assignObjectsOfArrays(newDataArray, json);
                }
                refreshDataArray(numberOfPage, { status: 'pending', data: newDataArray },dataArray);
            } catch (error) {
                refreshDataArray(numberOfPage, { status: 'rejected' })
                throw error
            }
        }
        refreshDataArray(numberOfPage, { status: 'resolved', data: newDataArray },dataArray);
    }
    useEffect(() => {
        handlePageChanged(currentPage);
    }, []);
    return (
        <div className='Pagination'>
            <div className='pagination-items'>
                {
                    dataArray[currentPage] ?
                        dataArray[currentPage].data ?
                            props.render(dataArray[currentPage].data)
                            : <Spiner />
                        : <Spiner />
                }
            </div>
            <Pager
                total={totalPages}
                current={currentPage}
                visiblePages={visiblePages}
                titles={{ first: props.first, last: props.last }}
                className="pagination-toolbar"
                onPageChanged={handlePageChanged}
            />
        </div>
    );
}