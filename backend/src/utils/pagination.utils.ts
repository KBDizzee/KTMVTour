

export const getPagination = (page:number,limit:number,total:number)=>{
  const total_pages = Math.ceil(total/limit)
  const next_page = total_pages > page ? page + 1 : null
  const prev_page = page >  1 ? page - 1 : null
  const has_next_page = total_pages > page 
  const has_prev_page = page > 1

  return{
    total,
    total_pages,
    next_page,
    prev_page,
    has_next_page,
    has_prev_page
  }
}