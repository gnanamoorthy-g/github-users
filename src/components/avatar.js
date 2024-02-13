export default function Avatar({user= null}){
    return (
        <div className="flex items-center justify-center avatar-container">
            <img className="avatar" src={user?.avatar_url} alt={user?.login} loading="lazy"></img>
        </div>
    )
}