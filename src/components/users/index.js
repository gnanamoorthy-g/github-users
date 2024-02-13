import React, { useCallback, useRef, useState } from 'react';
import usePagination from './usePagination';

import User from '../user';

export default function Users(){
    const [pageNumber, setPageNumber] = useState(1);
    const { isLoading, users, hasMorePages} = usePagination(pageNumber);
    const observer = useRef();

    const lastUserRef = useCallback((node) => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && hasMorePages){
                setPageNumber(prev => prev+1);
            }
        });
        if (node) {
            observer.current.observe(node);
        }
    },[hasMorePages]);

    return (
        <div className='grid grid-cols-3 gap-4 mx-5'>
        {users.map((user,index)=>{
            if(index === users.length -1) return (
                <User ref={lastUserRef} key={user.id} user={user}/>
            )
            else return (
                <User key={user.id} user={user}/>
            )
        })}
        {/* {isLoading && <div>isLoading...</div>} */}
        </div>
    )
}