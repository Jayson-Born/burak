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


    //MIT TASK ZL

    function stringToKebab(str: string) {
      
        return str
          .toLowerCase()          
          .replace(/\s+/g, '-')  
          .replace(/[^\w\-]+/g, '');
      }
      
      console.log(stringToKebab("I love Kebab"));
      

    //MIT Task ZK

    // function printNumbers() {
    //     let number = 1;
    //     const interval = setInterval(() => {
    //         console.log(number);
    //         number++;
    
    //         if (number > 5) {
    //             clearInterval(interval); 
    //         }
    //     }, 1000); 
    // }
    
    // printNumbers();
    


    //MIT Task ZJ

    // function reduceNestedArray(arr: any[]) {
    //     let sum = 0;
    
    //     for (const item of arr) {
    //         if (Array.isArray(item)) {
    //             sum += reduceNestedArray(item); 
    //         } else if (typeof item === 'number') {
    //             sum += item; 
    //         }
    //     }
    
    //     return sum;
    // }
    

    // console.log(reduceNestedArray([1, [1, 2, [4]]])); 
  
    


    //MIT Task ZI

    // function delayHelloWorld() {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve("Hello World");
            
    //         },3000);
    //     })
    // };
    // delayHelloWorld() .then(console.log);





//  MIT Task ZH

// function findDisappearedNumbers(arr: number[]) {
//     const max = Math.max(...arr); 
//     const allNumbers = [];


//     for (let i = 1; i <= max; i++) {
//         allNumbers.push(i);
//     }


//     const missingNumbers = allNumbers.filter(num => !arr.includes(num));

//     return missingNumbers;
// }


// console.log(findDisappearedNumbers([1, 3, 4, 7]))


     //MIT Task ZG
    // function toSnakeCase(str: string): string {
    //     return str.toLowerCase().replace(/\s+/g, '_');
    // }
    
    // console.log(toSnakeCase('name should be a string')); 
    


    //MIT Task ZF

    // function capitalizeWords(str: string) {
    //     return str
    //       .split(' ') 
    //       .map((word: string) => 
    //         word.length > 2 ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word
    //       ) 
    //       .join(' '); 
    //   }
      
    //   console.log(capitalizeWords('name should be a string')); // 'Name Should be a String'
      

    //MIT Task ZE

    // function removeDuplicate(str: string): string {
    //     let seen = new Set<string>();
    //     let result = "";
    
    //     for (let char of str) {
    //         if (!seen.has(char)) {
    //             seen.add(char);
    //             result += char;
    //         }
    //     }
    
    //     return result;
    // }
    
    // console.log(removeDuplicate("stringg")); 
    // console.log(removeDuplicate("hello")); 
    // console.log(removeDuplicate("mississippi")); 
    

    // MIT Task ZD
    // function changeNumberInArray(number1: number, massiv: any[], number2: number) {
    //     let result = [];
    //     for (let index = 0; index < massiv.length; index++) {
    //       if(index == number1){
    //         massiv[number1] = number2;
    //         result = massiv
    //       }
    //     }
    
    //     return result;
    // }

    // MIT Task ZC

    // function celsiusToFahrenheit(celsius: number): number {
    //     return(celsius *9/5) + 32;
    // }
    
    
    // console.log(celsiusToFahrenheit(0)); 
    // console.log(celsiusToFahrenheit(100)); 
    // console.log(celsiusToFahrenheit(-40)); 
    
// MIT Task Za

// const sortByAge = (arr: {name: string, age: number} []) =>{
//     return arr.sort((a, b) => a.age - b.age);
// }
//     console.log(sortByAge([{name: "Tom", age: 20}, {name: "Jerry", age: 30}, {name: "Spike", age: 25}])); 


//MIT Task Z

// function sumEvens(nums: number[]): number {
//   return nums.reduce((total: number, value: number) => {
//     return (value & 1) === 0 ? total + value : total;
//   }, 0);
// }

// console.log(sumEvens([1, 2, 3])); 
// console.log(sumEvens([1, 2, 3, 2])); 


    //MIT Task Y
    // function findIntersection(arr1: number[], arr2: number[]): number[] {
    //     arr1.sort();
    //     arr2.sort();
    //     const result: number[] = [];
    //     let [i, j] = [0, 0];
      
    //     while (arr1[i] != undefined && arr2[j] != undefined) {
    //       if (arr1[i] == arr2[j]) {
    //         if (!result.includes(arr1[i])) {
    //           result.push(arr1[i]);
    //         }
    //         i++;
    //         j++;
    //       } else if (arr1[i] > arr2[j]) {
    //         j++;
    //       } else {
    //         i++;
    //       }
    //     }
    //     return result;
       
    //   }
    //   console.log(findIntersection([1,2,3], [3,2,0]));

     

//MIT Task X


//  Shunday function yozing, uni object va string parapetrlari bolsin. Function string parametri object ichida necha marotaba takrorlanganligini qaytarsin (nested object bolsa ham sanasin)
//  MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2



// function countOccurrences(obj: { model: string; steer: { model: string; size: number; }; }, key: string) {
//     let count = 0;  
//     function countKeys(obj: { [x: string]: any; model?: string; steer?: { model: string; size: number; }; hasOwnProperty?: any; }) {
//         for (let prop in obj) {
//             if (obj.hasOwnProperty(prop)) {
//                 if (prop === key) {
//                     count++;
//                 }
        
//                 if (typeof obj[prop] === 'object' && obj[prop] !== null) {
//                     countKeys(obj[prop]);  
//                 }
//             }
//         }
//     }

//     countKeys(obj);  
//     return count;   
// }


// const result = countOccurrences({ model: 'Bugatti', steer: { model: 'HANKOOK', size: 30 } }, 'model');
// console.log(result);  



//MIT Task W

// function chunkArray(array: any[], size: number) {
//     let result = [];
//     for (let i = 0; i < array.length; i += size) {
//         result.push(array.slice(i, i + size));
//     }
    
//     return result;
// }
// console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9,  10], 3));


// MIT Task V

// function countChars(word: string) {
// const count: { [key: string]: number } = {};
// for (let char of word) {
//     if (char in count) {
// count[char]++;
//     } else {
// count[char] = 1;
// }
// }
//     return count;
//   }
  
//   console.log(countChars("hello"));

//MIT Task U


// function sumOdds(num: number) {
//   return Math.floor(num / 2);
// }

// console.log(sumOdds(9)); 
// console.log(sumOdds(11)); 
// console.log(sumOdds(12)); 

    //MIT Task T

//     function mergeSortedArrays(array1: string | any[], array2: string | any[]) {
//       let i = 0; 
//       let j = 0; 
//       const result = []; 
  
      
//       while (i < array1.length && j < array2.length) {
//           if (array1[i] < array2[j]) {
//               result.push(array1[i]); 
//               i++;
//           } else {
//               result.push(array2[j]); 
//               j++;
//           }
//       }
  
//       while (i < array1.length) {
//           result.push(array1[i]);
//           i++;
//       }
  
      
//       while (j < array2.length) {
//           result.push(array2[j]);
//           j++;
//       }
  
//       return result; 
//   }
  
  
//   const natija = mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);
//   console.log(natija); 
  

    //MIT Task S

    // function findMissingNumber(numbers: number[]): number {
    //   const totalCount = numbers.length; 
    //   const totalSum = (totalCount * (totalCount + 1)) / 2; 
    //   const actualSum = numbers.reduce((sum, num) => sum + num, 0); 
    //   return totalSum - actualSum; 
    // }
    
    // console.log(findMissingNumber([3, 0, 1])); 
    

    //MIT Task R

    // function calculate(expression: string): number {
    //     const result = eval(expression);
    //     return result;
    //   }
      
    //   console.log(calculate("1 + 3")); 
      

    //MIT Task

    // function hasProperty(obj: { name: string; model: string; }, prop: string) {
    //     for (let key in obj) {
    //         if (key === prop && Object.prototype.hasOwnProperty.call(obj, key)) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    
    // // Example usage:
    // console.log(hasProperty({ name: "BMW", model: "M3" }, "model")); // true
    // console.log(hasProperty({ name: "BMW", model: "M3" }, "year"));  // false
    

    //MIT Task P
    // function objectToArray(obj: { [key: string]: any }): [string, any][] {
    //     return Object.entries(obj);
    // }
    
    // const result = objectToArray({a: 10, b: 20});
    // console.log(result); 
    
    


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

    // function nodir (str: number[]) {
    //     const a = str.map((str.))
    // }