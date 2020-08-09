import React from 'react';
import Pager from 'react-pager';
import Spiner from './Spiner';
import '../style/Pagination.css';
class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: props.totalPages,
            currentPage: props.currentPage,
            visiblePages: props.visiblePages,
            dataArray: props.externalArray ? props.externalArray : new Array(10)
        };
        this.handlePageChanged = this.handlePageChanged.bind(this);
        this.refreshDataArray = this.refreshDataArray.bind(this);
        this.assignObjectsOfArrays = this.assignObjectsOfArrays.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }
    handlePageChanged(newPage) {
        this.setState({ currentPage: newPage })
        if (!this.state.dataArray[newPage] || this.state.dataArray[newPage].status === 'rejected' || this.state.dataArray[newPage].status === 'notLoad') {
            this.fetchData(newPage);
        }
    }
    refreshDataArray(index, newData) {
        const newArray = this.state.dataArray.slice();
        newArray[index] = newData;
        this.setState({ dataArray: newArray });
    }
    assignObjectsOfArrays(targetArray, sourceArray) {
        if (targetArray.length !== sourceArray.length)
            throw new Error('Incorrect data!');
        let indexIterator = 0;
        for (let object of sourceArray) {
            targetArray[indexIterator] = Object.assign(targetArray[indexIterator], object);
            indexIterator++;
        }
        return targetArray;
    }
    async fetchData(numberOfPage) {
        let newDataArray = [];
        this.refreshDataArray(numberOfPage, { status: 'notLoad' });
        for (let fetchPath of this.props.fetchArray) {
            try {
                const resp = await fetch(fetchPath, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.props.token
                    },
                    body: JSON.stringify({
                        'group': numberOfPage,
                        'number': this.props.numberOfItemsOnPage
                    })
                });
                if (resp.status >= 400 && resp.status < 500)
                    throw new ReferenceError('Error to fetch ' + fetchPath);
                const json = await resp.json();
                if (!Array.isArray(json))
                    throw new TypeError('Incorect data. Data must be Array');
                if (newDataArray.length === 0) {
                    newDataArray = json;
                }
                else {
                    newDataArray = this.assignObjectsOfArrays(newDataArray, json);
                }
                this.refreshDataArray(numberOfPage, { status: 'pending', data: newDataArray });
            } catch (error) {
                this.refreshDataArray(numberOfPage, { status: 'rejected' })
                throw error
            }
        }
        this.refreshDataArray(numberOfPage, { status: 'resolved', data: newDataArray });
    }
    componentDidMount() {
        this.handlePageChanged(this.state.currentPage);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.dataArray !== this.state.dataArray)
            if (this.props.setExternalArray)
                this.props.setExternalArray(this.state.dataArray);
    }
    render() {
        return (
            <div className='Pagination'>
                <div className='pagination-items'>
                    {
                        this.state.dataArray[this.state.currentPage] ?
                            this.state.dataArray[this.state.currentPage].data ?
                                this.props.render(this.state.dataArray[this.state.currentPage].data)
                                : <Spiner />
                            : <Spiner />
                    }
                </div>
                <Pager
                    total={this.state.totalPages}
                    current={this.state.currentPage}
                    visiblePages={this.state.visiblePages}
                    titles={{ first: this.props.first, last: this.props.last }}
                    className="pagination-toolbar"
                    onPageChanged={this.handlePageChanged}
                />
            </div>
        )
    }
}
export default Pagination