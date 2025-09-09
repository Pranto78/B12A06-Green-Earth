


#### 1) What is the difference between var, let, and const?

#### 2) What is the difference between map(), forEach(), and filter()? 

#### 3) What are arrow functions in ES6?

#### 4) How does destructuring assignment work in ES6?

#### 5) Explain template literals in ES6. How are they different from string concatenation?



Answer:

 1.  var: (i) Function-scoped or Global-scoped. A variable declared with var is accessible anywhere within the function it's declared in or globally if declared       outside a function.

           (ii) Can be reassigned. You can change the value of a var variable at any time.

           (iii) Can be redeclared. You can declare the same variable multiple times in the same scope without an error, which can lead to bugs.

           (iv) var is like an old, big storage chest in a room


     let:  (i) Block-scoped. A variable declared with let is only accessible within the curly braces {} of the block where it's defined. This includes if statements for loops and functions.  

           (ii) Can be reassigned. The value of a let variable can be updated after it's been declared.

           (iii) Cannot be redeclared. Redeclaring a let variable within the same scope will result in a SyntaxError.

           (iv) let is like a smaller box (block scope).


     const: (i) Block-scoped. Similar to let, const is also limited to the block in which it is declared.

            (ii) Cannot be reassigned. The value of a const variable is a constant and cannot be changed after its initial assignment. However for objects and arrays declared with their properties can be modified.

            (iii) Cannot be redeclared. Like let redeclaring a const variable in the same scope will cause a SyntaxError .

            (iv) const is like a small locked box  


2.   forEach(): (i) Used to iterate over each element of an array

                (ii) Executes a callback for every element

                (iii) Does not return a new array. Always returns undefined


       map():   (i) Used to transform each element of an array.

                (ii) Executes a callback and returns a new array with the transformed values.

                (iii) Original array stays unchanged.


      filter():  (i) Used to filter elements based on a condition.

                 (ii) Returns a new array with only the elements that pass the test.

                 (iii) Useful when you want to keep certain items and remove others.                 



3. In ES6 (ECMAScript 2015), arrow functions were introduced as a shorter and more concise way to write functions in JavaScript. Unlike traditional functions, arrow functions use the => syntax, making them easier to read and especially useful for inline or callback functions. One of the most important differences is how they handle the this keyword: arrow functions do not have their own this context, but instead inherit it from their surrounding scope, which avoids common problems with this in regular functions. They are also not suitable for use as constructors and cannot be used with the new keyword. Overall, arrow functions make code cleaner and more expressive, particularly when working with array methods like map(), filter(), and forEach().



4. In ES6, destructuring assignment is a convenient way to extract values from arrays or properties from objects and assign them to variables in a single statement. Instead of accessing elements or properties one by one, destructuring lets you unpack them directly into variables, making the code shorter and more readable.

                For example: 

                                const numbers = [10, 20, 30];
                                const [a, b] = numbers;
                                console.log(a); // 10
                                console.log(b); // 20

        In short, destructuring assignment makes it easier to work with arrays and objects by allowing developers to quickly extract and assign values without repetitive code.



5.  In ES6, template literals are a new way to work with strings that make them more powerful and easier to read compared to traditional string concatenation.They are defined using backticks (`) instead of single (') or double (") quotes. With template literals, you can directly embed variables and expressions inside a string using the ${...}syntax, which eliminates the need for complex concatenation with the `+` operator.

                                example: 
                                                const name = "Rahim";
                                                const age = 21;

                                                const message = `My name is ${name} and I am ${age} years old.`;
                                                console.log(message);


