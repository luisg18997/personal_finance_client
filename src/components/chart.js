import React from 'react'
import Chart from 'react-apexcharts'

const ChartReport = ({data,type}) => {
    return(
        <div className='row w-100 justify-content-center'>
            {
                <div className='w-100  h-100 col-md-12 col-lg-12 col-sm-12'>
                    <Chart options={data.options}
                    series={data.series}
                    type={type}
                    width="100%"
                     />
                </div>
            }
        </div>
    )

}

export default ChartReport