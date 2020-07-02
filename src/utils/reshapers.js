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
//                      {"_and": [
//                                  {"english": {"_like": "%pu"}}, 
//                                  {"nicodemus": {"_like": "%ha%"}},
//                                  {"_or": [
//                                            {"english": {"_like": "%he%"}},
//                                            {"nicodemus": {"_like": "%he%"}}
//                                          ]
//                                  }
//                               ]
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
//     },
//   ]
//
//  "globalFilter": "he"
//
//  "globalFilterVariables": ["english", "nicodemus"]


export function filterReshape(filters, globalFilter, globalFilterVariables) {
    console.log('filters', filters)
    console.log('globalFilter', globalFilter)
    console.log('globalFilterVariables', globalFilterVariables)
    let res = {}
    let andCond = []
    let globalOrCond = []

    if (globalFilterVariables && globalFilter) {
        globalFilterVariables.forEach((item) => {
            let h = {}
            h = { [item]: { "_like": "%" + globalFilter + "%" } }     
            globalOrCond.push(h)        
        })
    }

    if (filters) {
        filters.forEach((item) => {
            let h = {}
            h = { [item.id]: { "_like": "%" + item.value + "%" } }     
            andCond.push(h)
        })
    }
    if (globalFilter && globalFilterVariables && globalFilterVariables.length > 0 && globalFilter.length > 0) {
        andCond.push({"_or": globalOrCond})
    }

    if (andCond.length > 0) {
        res =  {"_and": [{"active": {"_eq": "Y"}}, {"_and": andCond}]} 
    } else {
        res = {"active": {"_eq": "Y"}}
    }

    return(res)
}