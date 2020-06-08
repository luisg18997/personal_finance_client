import React from 'react'


const TableComponent = ({title, data, message}) => {

    const Titles = () => {
        var titles = title.map((item, key) => (
            <th key={key}>{item}</th>
        ))
        return titles
    }

    const Datas = () => {
        var values = []
        if(data.length > 0) {
            data.forEach((item, id) => {
                var value = item.map((element, key) => (
                    <td key={key} data-title={title[key]}>
                        <div className='table-title'>{title[key]}</div>
                        <div className={title[key] === 'email'?'table-text email': 'table-text'}>{element}</div>
                    </td>
                ))
                values.push(
                    <tr key={id}>
                        {value}
                    </tr>
                )
            })
        } else {
            values = (
                <tr>
                    <td colSpan={title.length}>{message}</td>
                </tr>)
        }
        return values
    }

    return(
        <table>
            <thead>
                <tr>
                    {Titles()}
                </tr>
            </thead>
            <tbody>
                {Datas()}
            </tbody>
        </table>
    )
}

export default TableComponent
