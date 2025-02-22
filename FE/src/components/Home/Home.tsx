import { useDispatch } from "react-redux"
import { reduxStore } from "../../redux/store"
import { getWelcomeMsg } from "../../redux/homeSlice"
import { useQuery } from "@tanstack/react-query"


const Home = () => {
  const dispatch = useDispatch<typeof reduxStore.dispatch>()
  const query = useQuery({
    queryKey:  ['homeQuery'],
    queryFn : async () => {
      const result = await dispatch(getWelcomeMsg()).unwrap()
      return result;
    },
    select(data) {
        return data.message
    },
  })

  return (
    <div className='py-20'>
      <h1 className="font-semibold text-3xl">{query.data || query.error?.message}</h1>
    </div>
  )
}

export default Home