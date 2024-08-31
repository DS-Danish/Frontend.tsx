// // Data.tsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Data.css';

// const Data: React.FC = () => {
//   // const [users, setUsers] = useState([]);
//   // const navigate = useNavigate();

//   // useEffect(() => {
//   //   const fetchUsers = async () => {
//   //     try {
//   //       const response = await axios.get('http://localhost:3000/getAllUsers', { withCredentials: true });
//   //       setUsers(response.data);
//   //     } catch (error) {
//   //       console.error('Failed to fetch users', error);
//   //     }
//   //   };

//   //   fetchUsers();
//   // }, []);

//   // const handleBack = () => {
//   //   navigate('/home');
//   // };

//   return (
//     <div className="data-page">
//       {/* <h2>Data Of All Users</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users?.map((user: any) => (
//             <tr key={user.id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleBack}>Back to Home</button> */}
//     </div>
//   );
// };

// export default Data;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Data.css';

const Data: React.FC = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getAllUsers', { withCredentials: true });
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="data-page">
      <h2>Data Of All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleBack}>Back to Home</button>
    </div>
  );
};

export default Data;

// This line ensures that the file is treated as a module
export {};
