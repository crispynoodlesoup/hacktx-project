import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

function User() {
    const { name } = useParams();

    return (
        <Outlet context={[name]}/>
    );
}

export default User;