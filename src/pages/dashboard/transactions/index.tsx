import React from 'react'

export const DashboardTransactionsScreen = () => {
  return (
    <div>
    <div className='card'>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
   {Array.from({length:30}).map((a,i)=><tr key={i}>
      <th scope="row">{i+1}</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>)}
  </tbody>
      </table>
    </div>
    </div>
  )
}

export default DashboardTransactionsScreen;