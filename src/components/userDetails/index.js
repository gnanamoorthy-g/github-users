import { Octokit } from "octokit";
import { useParams } from "react-router-dom";
import Avatar from "../avatar";
import { auth_token } from "../../env";
import { useEffect, useState } from 'react';

import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import XIcon from '@mui/icons-material/X';

const octokit = new Octokit({ auth: auth_token });



export default function UserDetails() {
    const params = useParams();
    const user_login = params?.login || null;
    console.log(user_login,"user_login")

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        getUserDetails();
    }, []);

    async function getUserDetails() {
        if(!user_login) return;
        let user_data = await octokit.request(`GET /users/${user_login}`, {
            username: user_login,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        setUserDetails(user_data.data);
    }


    return (
        <div className="m-5 p-10 border-1 border-solid border-[#F3F4F6] bg-white rounded-md user-details">
            <div className="grid items-center justify-center">
                <div className="flex items-center justify-center my-8"><Avatar user={userDetails && userDetails} /></div>
                <div className="flex items-center justify-center my-1 text-2xl font-bold">{userDetails?.name}</div>
                <div className="flex items-center justify-center my-1 text-[#525252] font-medium"><span className="mx-2"><CorporateFareIcon/></span><span>{userDetails?.company ?? "-"}</span></div>
                <div className="flex items-center justify-center my-1 text-[#525252] font-medium"><span className="mx-2"><EmailIcon/></span><span>{userDetails?.email ?? "-"}</span></div>
                <div className="flex items-center justify-center my-1 text-[#525252] font-medium"><span className="mx-2"><PlaceIcon/></span><span>{userDetails?.location ?? "-"}</span></div>
                <div className="flex items-center justify-center my-1 text-[#525252] font-medium"><span className="mx-2"><XIcon/></span><span>{userDetails?.twitter_username ?? "-"}</span></div>
                <div className="flex items-center justify-center my-1 text-[#525252] font-medium">{userDetails?.followers ?? 0} Followers</div>
                <div className="flex items-center justify-center my-1 text-[#525252] font-medium">{userDetails?.following ?? 0} Following</div>
            </div>
        </div>
    )
}