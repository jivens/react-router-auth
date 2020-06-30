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