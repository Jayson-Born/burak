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


    function palindromeCheck(string: string)  {
    

        const reversedString = string.split(""). reverse().join('')
        return string === reversedString

        

    }
    console.log(palindromeCheck("dad"))