/* Project Standards:
    -Logging standards
    -Naming standards:
        function, method, variables => CAMEL
        class => PASACAL
        folder, file => KEBAB
        css => SNAKE
    -Error handling

    */


    /* Frontend Development:
    Traditional API 
    Rest API
    GraphQL API
    ...
    */


    /* cookie:
    join request
    self destroy
     */

    /* Validation:
    Frontend:validation
    backend: validation
    Database validation
    */


    //MIT Task P
    function objectToArray(obj: { [key: string]: any }): [string, any][] {
        return Object.entries(obj);
    }
    
    const result = objectToArray({a: 10, b: 20});
    console.log(result); 
    
    


    //MIT Task O

    // function calculateSum(arr: (string | number | boolean | { number: number; })[]) {
    //     let sum = 0;
    //     for (let item of arr) {
    //         if (typeof item === "number") {
    //             sum += item;
    //         }
    //     }
    //     return sum;
    // }
    
    // // Test
    // console.log(calculateSum([10, "10", { number: 10 }, true, 35])); // Output: 45


    // MIT task N

    // function palindromeCheck(string: string)  {
    

    //     const reversedString = string.split(""). reverse().join('')
    //     return string === reversedString

        

    // }
    // console.log(palindromeCheck("dad"))