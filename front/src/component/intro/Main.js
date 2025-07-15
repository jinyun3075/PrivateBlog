 import React, {useEffect, useState} from 'react';
 export function Test1(){
    const[data, setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost/api/insert/tag",{
        method: "POST",           
        headers: {
            "Content-Type": "application/json",
        },    
        body: JSON.stringify({
            name:"hh"
            ,description:"tt"
            ,use_yn:"Y"
        }),
        }).then(()=>{
            return fetch("http://localhost/api/select/tag/1");
        }).then(res => res.json())
        .then(res => {
            setData(res);
        })
    }, []);
    return(
        <div>
            <h1>{data ? JSON.stringify(data):"로딩로딩"}</h1>
            <h1>Test1</h1>
            <p>이곳은 테스트용 컴포넌트입니다.</p>
        </div>
    );
 }