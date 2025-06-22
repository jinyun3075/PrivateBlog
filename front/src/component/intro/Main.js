 export function Test1(){
    return(
        <Test3>
            <Test2
            src="https://i.imgur.com/7vQD0fPs.jpg"
            alt="Katherine Johnson">
            </Test2>
            <Test2
            src="https://i.imgur.com/7vQD0fPs.jpg"
            alt="Katherine Johnson">
            </Test2>
        </Test3>
        
    );
 }

 export function Test2({src, alt}) {
    return(
        <img
            class="avatar"
            src={src}
            alt={alt}
        />
    );
 }
 export function Test3({children}) {
   return(
       <div>
           {children}
       </div>
   );
 }