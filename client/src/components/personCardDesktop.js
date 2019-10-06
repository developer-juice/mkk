import React from 'react';



function PersonCard(props){


  return(
    <tr className="human-card">
      <th>
        <div className="card">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-text">Person name</p>
          </div>
        </div>
        </th>
      <td>marry</td>
      <td>kiss</td>
      <td>kill</td>
    </tr>
  )

}


export default PersonCard;
