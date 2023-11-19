import { useRouteError } from "react-router-dom";

const Error=()=>{
    const err = useRouteError();

    return(
        <div>
        <h1>{err?.error?.message}</h1>
        <h2>{err.status}:{err.statusText}</h2>

        </div>
    )
}
export default Error; 