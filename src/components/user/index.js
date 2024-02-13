import { Octokit } from "octokit";
import { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../avatar";
import { Skeleton } from "@mui/material";
import { auth_token } from "../../env";
const octokit = new Octokit({ auth: auth_token });

const User = forwardRef(function ({ user = null }, ref) {
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getUserDetails();
    }, []);

    async function getUserDetails() {
        setIsLoading(true);
        let user_data = await octokit.request(`GET /users/${user.login ?? ''}`, {
            username: user.login ?? '',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        setUserDetails(user_data.data);
        setIsLoading(false);
    }

    const renderUserInfo = () => {
        if (isLoading || !userDetails) return (
            <div>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </div>
        )
        else return (
            <div>
                <div className="px-2 py-1"><span className="text-[#9095A1] text-base italic">Name :</span><span className="px-2">{userDetails.name || '-'}</span></div>
                <div className="px-2 py-1 whitespace-nowrap text-ellipsis overflow-hidden"><span className="text-[#9095A1] text-base italic">Bio :</span><span className="px-2">{userDetails.bio || '-'}</span></div>
                <div className="px-2 py-1"><span className="text-[#9095A1] text-base italic">Email :</span><span className="px-2">{userDetails.email || '-'}</span></div>
            </div>
        )
    }

    return (
        <div
            ref={ref}
            className="user-card grid"
            key={user.id}
        >
            <div className="flex items-center justify-center"><Avatar user={user} /></div>
            <div className="flex-1 flex flex-col mx-5">
                <div className="flex justify-between mb-2">
                    <Link to={`/user/${user.login}`}>
                        <div className="cursor-pointer font-semibold  text-[#007BFF] hover:underline">{user.login}</div>
                    </Link>
                    <div className="flex items-center justify-center text-[#9095A1] text-sm"><a className="cursor-pointer text-ellipsis overflow-hidden repo-link" target="_blank" href={user.html_url}>{user.html_url}</a></div>
                </div>
                <h3 className="text-[#171A1F] font-semibold">User Info:</h3>
                {renderUserInfo()}
            </div>
        </div>
    )
});

export default User;