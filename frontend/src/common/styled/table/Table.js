import styled from "styled-components";

export default styled.table((props) => {
    const gridTemplateColumns = props.columns.map(column => `minmax(${column.min}, ${column.max})`)
    return ({
        display: 'grid',
        overflowY: 'auto',
        borderCollapse: 'collapse',
        maxHeight: '100%',
        gridTemplateColumns: gridTemplateColumns.join(''),
    })
})
