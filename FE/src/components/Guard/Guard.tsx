import { ReactElement } from "react"
import NotFound from "../NotFound/NotFound"

interface GuardInt {
    children: ReactElement
}

const Guard = (props: GuardInt) => {
    if (localStorage.getItem('token') !== null) {
        return (
            <>
                {props.children}
            </>
        )
    } else {
        return (
            <>
                <NotFound />
            </>
        )
    }

}

export default Guard