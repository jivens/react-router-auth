export function sortReshape(sortBy) {
    let res = []
    sortBy.forEach((item) => {
        let h = {}
        if (item.desc) {
            h = { [item.id]: "desc"}
        }
        else {
            h = { [item.id]: "asc"}           
        }
        res.push(h)
    })
    
    return(res)
}

// "where": { "_and": [
//                      {"active": {"_eq": "Y"}}, 
//                      {"_or": [
//                               {"english": {"_like": "%horse%"}}, 
//                               {"nicodemus": {"_like": "%horse%"}}
//                              ]
//                      }
//                    ]
//           }
//
// "filters": [
//     {
//       "id": "nicodemus",
//       "value": "ha"
//     },
//     {
//       "id": "english",
//       "value": "pu"
//     }
//   ]


export function filterReshape(filters) {
    let res = {}
    let andCond = []
    filters.forEach((item) => {
        let h = {}
        h = { [item.id]: { "_like": "%" + item.value + "%" } }     
        andCond.push(h)
    })
    if (filters.length > 0) {
        res =  {"_and": [{"active": {"_eq": "Y"}}, {"_and": andCond}]} 
    } else {
        res = {"active": {"_eq": "Y"}}
    }

    return(res)
}