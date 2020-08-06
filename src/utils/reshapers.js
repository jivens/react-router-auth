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

    console.log("The result of the sort: ", res)
    
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
    //console.log('filters', filters)
    //console.log('globalFilter', globalFilter)
    //console.log('globalFilterVariables', globalFilterVariables)
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
            if (item.id.includes(".")) {
                // Make an assumption that there is only one '.' char in the string
                let [outer, inner] = item.id.split(".")
                h = { [outer]: { [inner]: { "_like": "%" + item.value + "%" } } }
            } else {
                h = { [item.id]: { "_like": "%" + item.value + "%" } }
            }
            andCond.push(h)
        })
    }
    if (globalFilter && globalFilterVariables && globalFilterVariables.length > 0 && globalFilter.length > 0) {
        andCond.push({"_or": globalOrCond})
    }

    if (andCond.length > 0) {
        res = {"_and": andCond}
    } else {
        res = {}
    }
        
    //     res =  {"_and": [{"activeByActive": {"value": {"_eq": "Y"}}}, {"_and": andCond}]} 
    // } else {
    //     res = {"activeByActive": {"value": {"_eq": "Y"}}}
    // }

    console.log("The filter result: ", res)

    return(res)
}