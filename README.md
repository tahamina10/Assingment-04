1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans:   getElementById("id") selects a single element by id.
getElementsByClassName("class") selects all elements with the given class (live HTMLCollection).
querySelector("selector") selects the first element matching any CSS selector.
querySelectorAll("selector") selects all elements matching any CSS selector (static NodeList).

2. How do you create and insert a new element into the DOM?
Ans:Create element: document.createElement("tag")
Add content or attributes.
Insert into DOM using appendChild or insertBefore.

3. What is Event Bubbling? And how does it work?
Ans:Event Bubbling is when an event triggered on a child element propagates upward to its parent elements until it reaches the document root.

4. What is Event Delegation in JavaScript? Why is it useful?
Ans:
Event Delegation is attaching a single event listener to a parent to handle events on its child elements.
Useful for reducing the number of listeners and handling dynamically added elements.

5. What is the difference between preventDefault() and stopPropagation() methods?
Ans:preventDefault() stops the default browser action (like link navigation or form submit).
stopPropagation() prevents the event from bubbling up to parent elements.