// import React, { useState } from "react";
// import { Button } from "../components/AuthForm";
// import { useAuth } from "../context/auth";
// import { broadCastSuccess } from '../utils/messages';
// import { insertAffixMutation } from '../queries/queries';
// import { useMutation } from '@apollo/react-hooks';

// function errorCallback() {
//   console.log("Something bad happened")
// }

// function AddAffix(props) {
//   const { client } = useAuth();

//   const [
//     addAffix,
//     { data: insertAffixData, loading: insertAffixLoading, error: insertAffixError }
//   ] = useMutation(insertAffixMutation,  { client: client, errorPolicy: 'all', onError: errorCallback });

//   return (
//     <div>
//       <form
//         onSubmit={e => {
//           e.preventDefault();
//           addAffix();
//         }}
//       >
//         <button type="submit">Add Affix</button>
//       </form>
//       {insertAffixLoading && <p>Loading...</p>}
//       {insertAffixError && <p>Error :( Please try again</p>}
//     </div>
//   );
// }

// export default AddAffix;