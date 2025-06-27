 export function Test1(){
    const db = fetch("http://localhost/api/insert/tag",{
    method: "POST",           
    headers: {
        "Content-Type": "application/json",
    },    
    body: JSON.stringify({
        name:"hh"
        ,description:"tt"
        ,use_yn:"Y"
    }),
    });
    console.log(db);
    return(
        <div>
            <h1>Test1</h1>
            <p>이곳은 테스트용 컴포넌트입니다.</p>
        </div>
    );
 }