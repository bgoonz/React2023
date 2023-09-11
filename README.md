# React

## React v18 basic setup:

```js
import React from "react";
import ReactDOM from "react-dom/client";
function App() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

> With previous versions of react:

```js
import React from "react";
import ReactDOM from "react-dom";
function App() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
```

- When a component is removed from the view, this is called unmounting.
- When state or props change, the component is re-rendered (this means the component is removed and replaced with the component function using updated state or props).
- state is updated using an event handler or a callback function.
- React is called react because it reacts to state changes by re-rendering the UI.
- In the following code we would expect the incrementStep function to update the state twice...

```js
const incrementStep = () => {
  setStep(step === 3 ? 1 : step + 1);
  setStep(step === 3 ? 1 : step + 1);
};
```

- In reality it only updates once.
- We should not rely on the previous state when updating state.
- If we want to update state based on previous state we should provide a callback function to the setter function.

```js
const incrementStep = () => {
  setStep((prevStep) => (prevStep === 3 ? 1 : prevStep + 1));
  setStep((prevStep) => (prevStep === 3 ? 1 : prevStep + 1));
};
```

> Each instance of a component has and manages it's own state.

## Guidlines for using state:

- Use a state variable for any data the component should keep track of over time. (like a `let` or `var` variable or a `const` array or object that you mutate over time).
- For data that should not trigger a component re-render use a regular variable instead or use a ref.

---

### Controled Elements:

- by default, input elements like `<input>` and `<select>` maintain their own state in the DOM.
- In React development we like to keep track of state internally in our app... not in the DOM.
- In order to do that we use a technique called controlled elements...
  > Example of a controlled element:

```js
function Form() {
  const [description, setDescription] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?🧳</h3>
      <select>
        {Array.from({ length: 20 }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="item"
        placeholder="Item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
```

- In the above example, the input element is a controlled element because it's value is controlled by the state variable `description`, and the state variable is updated by the `onChange` event handler.

---

### Difference between props and state:

- State is interal to the component and props are passed in from the parent component.
- State can be changed by the component itself, props cannot be changed by the component itself.
- Props are passed in as attributes to the component.
- When the child compponent recieves new props from the parent component, the child component is re-rendered.

---

### Lifting State Up:

#### Instructions for lifting up state...

1. Identify the common state: Determine which component(s) need access to the shared state. Look for any data that needs to be shared or updated across these components.
2. Find the closest common ancestor: Identify the closest common ancestor of the components that need access to the shared state. This ancestor component will be responsible for managing and updating the state.
3. Define the state in the ancestor component: Add the necessary state variables to the ancestor component. These state variables will hold the shared data.
4. Pass the state as props: Pass the state variables as props from the ancestor component to the child components that need access to the shared state. This way, the child components can read the state and render accordingly.
5. Update the state: If any component needs to update the shared state, define a function in the ancestor component that modifies the state. Pass this function as a prop to the child components that need to update the shared state.
6. Handle state updates: In the child components, use the passed down function prop to update the state. Call this function whenever the component needs to modify the shared state.

#### Before lifting item state up from Form component:

```js
import { useState } from "react";
function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }
  function handleSubmit(event) {
    event.preventDefault();
    //guard clause against empty description
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    handleAddItems(newItem);
    //reset the form
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?🧳</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="item"
        placeholder="Item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
const Item = ({ item }) => {
  return (
    <li key={item.id}>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button>❌</button>
    </li>
  );
};
function PackingList() {
  return (
    <div className="list">
      {" "}
      <ul>
        {initialItems.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </ul>
    </div>
  );
}
```

#### After lifting item state up from Form component:

```js
import { useState } from "react";
function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}
function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(event) {
    event.preventDefault();
    //guard clause against empty description
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItem(newItem);
    //reset the form
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?🧳</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="item"
        placeholder="Item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
const Item = ({ item }) => {
  const description =
    item.quantity > 1 ? `${item.description}s` : item.description;
  return (
    <li key={item.id}>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {description}
      </span>
      <button>❌</button>
    </li>
  );
};
function PackingList({ items }) {
  return (
    <div className="list">
      {" "}
      <ul>
        {items.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </ul>
    </div>
  );
}
```

---

### Derived State:

- Derived state is state that is calculated from other state or props.
- If state can be derived from existing state then we do not want to create a new state to represent it because this will result in unnecessary rerendering any time the related state changes.

### Props.children:

- An empty hole that can be filled with any jsx the component recieves as children. The children prop allows us to pass jsx into an element. The only difference is that the children prop is not an html attribute but rather a prop that allows us to access jsx that is passed into the component as children.

```js
function Button(props) {
  const { clickHandler, backgroundColor, textColor } = props;
  return (
    <button
      style={{ backgroundColor: backgroundColor, color: textColor }}
      onClick={clickHandler}
    >
      {props.children}
    </button>
  );
}
export default Button;
// App.js
<Button
clickHandler={decrementStep}
backgroundColor="#7950f2"
textColor="#fff"
>
<span>⏮️</span> Previous
</Button>
<Button
clickHandler={incrementStep}
backgroundColor="#7950f2"
textColor="#fff"
emoji="⏭️"
>
{" "}
Next<span>⏭️</span>
</Button>
```

---

## Resources:

👉 [Writing Resilient Components](https://overreacted.io/writing-resilient-components/?ref=jonas.io) (By Dan Abramov from the React team)
👉 [Things I think about when I write React code](https://github.com/mithi/react-philosophies?ref=jonas.io) (GitHub repository)
👉 [A (Mostly) Complete Guide to React Rendering Behavior](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/?ref=jonas.io) (By Mark Erikson from the redux team)
👉 [A Visual Guide to React Rendering](https://alexsidorenko.com/blog/react-render-always-rerenders/?ref=jonas.io) (A multi-part series, check out the other ones)
👉 [Inside Fiber: in-depth overview of the new reconciliation algorithm in React](https://indepth.dev/posts/1008/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react?ref=jonas.io)
👉 [A Cartoon Intro to Fiber](https://www.youtube.com/watch?v=ZCuYPiUIONs?ref=jonas.io) (YouTube video)
👉 [What Is React Fiber? React.js Deep Dive](https://www.youtube.com/watch?v=0ympFIwQFJw?ref=jonas.io) (YouTube video)
👉 [The React and React Native Event System Explained](https://levelup.gitconnected.com/how-exactly-does-react-handles-events-71e8b5e359f2?ref=jonas.io)
👉 [Under the hood of event listeners in React](https://gist.github.com/romain-trotard/76313af8170809970daa7ff9d87b0dd5?ref=jonas.io)
👉 [A DIY guide to build your own React](https://github.com/pomber/didact?ref=jonas.io)
👉 [useSyncExternalStore First Look](https://julesblom.com/writing/usesyncexternalstore?ref=jonas.io)
👉 [Under the hood of React's hooks system](https://the-guild.dev/blog/react-hooks-system?ref=jonas.io)
👉 [Why Do React Hooks Rely on Call Order?](https://overreacted.io/why-do-hooks-rely-on-call-order/?ref=jonas.io) (By Dan Abramov
👉 [So you think you know everything about React refs](https://blog.thoughtspile.tech/2021/05/17/everything-about-react-refs/?ref=jonas.io)
👉 [react-use: Reusable React Hook Library](https://github.com/streamich/react-use?ref=jonas.io) (GitHub repository)
👉 [react-hookz: React hooks done right](https://github.com/react-hookz/web?ref=jonas.io) (GitHub repository)

#### Reusability:

** General Guidlines**

- Creating new components creates mental abstractions that are hard to keep track of in your mind.
- Name components according to what it does or what it displays... don't be afraid to use long component names.
- NEVER declare a new component inside of another component.
- Colocate related components inside the same file. Don't seperate components into different files too early in development.

---

## How React Works:

- A component is a function that describes of a part of the UI.
- A component is a function that returns React elements (jsx).
- A component is a generic blueprint or template for which different data will produce different UI.
- Instances are created when we use components in our code.

```js
function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>
      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}
function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}
```

> In the above example, the Tabbed component returns multiple instances of the Tab component.
> _An instance is the actual manifestation of a component that has it's own state and props (and has a lifecycle... i.e. it can be mounted and unmounted)._

- A component instance returns a React element (jsx) The react element is the result of the component function call.
  > Component instance: `console.log(<DifferentContent test={23}/>);` --> type: DifferentContent
  > React element: `console.log(DifferentContent({test: 23}));` --> type: div
- Finally the react element is rendered to the DOM using the ReactDOM.render() function(html)
  **How React Renders Components:**

1. Render is triggered (By updating state somewhere)
2. React calls the component functions and figures out how the Dom should be updated (Render phase). DOM is not actually updated in this phase.
   > In React, rendering is not updating the DOM or displaying elements on the screen. Rendering is the process of figuring out what changes need to be made to the DOM.
3. Commit Phase: React updates the DOM with the changes that were determined in the render phase.
4. Browser paints the screen... (produces visual changes user sees on their screen.)
   **Two situations that trigger renders:**
5. Initial render: When the component is first mounted to the DOM.
6. When state or props change: When state or props change, the component is re-rendered.

- A render is not triggered immediatly but scheduled for when the JS engine has some 'free time' . there is also batching of multiple setState calls in event handlers.
  Two common misconceptions about React:

1. **(false)** _Rendering is updating the screen/DOM_
2. **(false)** _React completely discards old view(DOM) on Re-Renders_
   **Virtual DOM (React Element Tree):**
3. **Initial Render** (Component Tree) gets converted to a React Element Tree (Virtual DOM) by React. This tree of react elements is what we refer to as the virtual dom. In practice this is a tree of all react elements freated from all instances in the component tree. It is cheap and fast to create multiple trees because behind the scenes they are JS-objects not DOM elements.

- In react documentation the term `virtual dom` has been replaced with `react element tree` , but it is still a common term in the community. (**Nothing to do with Shadow Dom.. which is a browser concept that has to do with isolating a branch of the DOM from the rest of the DOM**)
  **Rendering a component will cause all of it's child comonents to be rerendered as well (even if props has not changed)**
  > This is done because React doesn't know if children will be affected by the parent's render. So it just rerenders all children to be safe... remember that rendering is cheap and fast in React.

2. **Rerender Phase**
   Component instaces that triger re-render ---> React Element Tree (virtual dom) ---> Reconcilation + Diffing (Reconciliation is done by React's Reconciler known as Fiber) ---> Updated Fiber Tree (used to write to the DOM).

- What is Reconciliation and why do we need it?
  > Writing to the DOM is relativly slow and usually only a small part of the DOM needs to be updated. Whenever a re-render is triggered, React will try to reuse as much of the existing DOM as possible.
  > **Reconciliation** is the process of deciding which DOM elements actually need to be inserted, deleted, or updated in order to reflect the latest changes in state.
  > The result of reconiliation is a list of DOM operations that need to be performed in order to update the DOM.
- The reconciler (fiber) will create a new fiber tree from the the React Element Tree (Virtual DOM) and has a fiber for each component instance and DOM element... Fibers are not recreated on every rerender. The fiber tree is mutated on each rerender rather than recreated. Fiber keeps track of current state, props, sideEffects and used Hooks (as well as a _queue of work_ to be done) for each component instance.
- A fiber is a unit of work to be done... stored as a linked list for each component instance. The fiber tree is a tree of linked lists. The work can be done asynchronously and paused, resumed, or aborted. In react 18 this enables concurrent features like suspense or transitions. This means long renders won't block the JS engine.
  **Reconciliation:**
- Take the virtual dom and the corresponding fiber tree... let's say a piece of state (that determines of a modal is shown or not) is flipped from true to false... this will cause a new virtual dom where the modal component is removed. All remaning elements were re-rendered. This new React Element Tree(virtual DOM) needs to be reconciled with the existing fiber tree. This will result in an updated fiber tree (work in progress tree).
  ![Reconciliation](./images/2023-08-25-11-45-39.png)
  ![Component Tree](./images/2023-08-25-12-00-26.png)
- -> In the example in the image above the Btn element (yellow) has different text depending on the state in question and so the work to be done in the fiber tree is to update the DOM with the new text.
- -> The Modal, Overlay, H3, and Button (red) are no longer in the React Element Tree and are thus marked for deletion in the Updated Fiber tree.
- -> Finally we have the Video component which is a child of the App component but it did not change between renders and thus after reconciliation the dom element for the video will not be updated.
- -> Once reconciliation takes place all the dom mutations will be placed into a list called the _list of effects_ which will be used in the next (Commit) phase to update the DOM.
  **Render Phase**
  ![Render Phase](./images/2023-08-25-12-06-17.png)
  --> results in a list of DOM updates to be done.

---

### Commit Phase

- In the commit phase list of insertions, deletions and updates are "flushed" to the DOM.
- Commit phase is synchronous... DOM is updated in one go, it can't be interrupted. This is necessary so that the DOM never shows partial results, ensuring a consistent UI (in sync with state at all times).
- After the commit phase ompletes the workInProgress fiber tree becomes the current tree for the next render cycle.
- The Render phase is exicuted by the react library and the Browser Paint phase is exicuted by the browser... what about the commit phase? The commit phase is exicuted by the react-dom library.
- The React library is agnostic to the commit phase and the browser paint phase.
- The reason for this is that React can be used with other "hosts" such as react-native or react-three-fiber.
  ![The Commit Phase](./images/2023-08-25-13-08-25.png)

---

### Putting it all together:

1. First step is a trigger... (initial render or state update in a component instance)
2. Render phase: In react render means to call the component functions...React creates a new React Element Tree (virtual dom) and recconciles (finds what changes need to be made to current DOM to reflect change in state) it with the current Fiber Tree (work in progress tree) ...Rendering a component will also render all of it's children components (regardless of a change in props). The fiber tree has a fiber for each react component and DOM element.
   ![Render Phase](./images/2023-08-25-13-17-21.png)

- Complete update

  ![Complete Update](./images/2023-08-25-13-26-21.png)

---

### How Diffing Works:

- Diffing follows two fundamental rules:

1. Two elements of different types will produce different trees.
2. Elements with a stable key prop stay the same across renders.

#### Two cases we need to consider when diffing...

1. Same position, different element.
   ![Same position, different element.](./images/2023-08-25-13-32-06.png)
   > React will assume that the element it's self plus all of it's children are no longer valid. Old components are destroyed and removed from the DOM including state.

![Subtree is no longer valid.](./images/2023-08-25-13-34-28.png)

> The same logic applies to different React elements (component instances) as for differing DOM elements.

![Different React Elements](./images/2023-08-25-13-36-17.png)

2. Same position, same element.
   ![Same position, same element.](./images/2023-08-25-13-40-53.png)

> Elements will be kept (as well as child elements) including state.
> New props / attributes are passed if they changed between renders.

- Sometimes this behavior is not what we want... in that case we can use the `key` prop.

```js
function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}
```

In the case of the TabContent component we have the same component in the same place... so the state (i.e. how many likes or the show hide state) is preserved as we navigate through the tabs.

- Once we navigate to the Tab 4 we have a different component in the same place... so the state is lost and as such, when we navigate to tabs 1-3 we see that the description is shown and the like count is reset to 0.

#### The Key Prop:

- The key prop is a special prop we use to tell the diffing algorithm that the element is unique (works for both DOM elements and React Elements)
- This allows React to distinguish between multiple instances of the same component type.
- When a key stays the same across renders, the element will be kept in the DOM (even if the position in the tree changes).
- We generally use the key prop in lists.
- When a key changes between renders, the element will be destroyed and a new one will be created (even if the position in the tree is the same as before).
- We can use keys to reset state.

```js

<ul>
    <Question question={q[1]}>
    <Question question={q[2]}>
</ul>
```

> adding new list item:

```js
// now they will appear in different positions in the React Element Tree
// They are no longer the first and second children.. but the second and third children.
<ul>
    <Question question={q[0]}>
    <Question question={q[1]}>
    <Question question={q[2]}>
</ul>
```

**Adding Keys**

```js
<ul>
    <Question key="q1" question={q[1]}>
    <Question key="q2" question={q[2]}>
</ul>
```

**Adding new list Item**

```js
<ul>
    <Question key="q0" question={q[0]}>
    <Question key="q1" question={q[1]}>
    <Question key="q2" question={q[2]}>
</ul>
```

**How to reset state using keys**

```js
function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} key={activeTab} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}
```

---

##### Logic in React Components:

**Two types of logic:**

1. Render Logic: Logic that determines what the UI should look like. Code that lives at the top level of a component function.
2. Event Handler Logic: Logic that determines what happens when the user interacts with the UI. (code that does things or reacts to change)

![React Logic](./images/2023-08-26-13-34-41.png)

**Functional Programming Principles**

- **Side effect**: dependency on or modification of any data outside of the function scope. "Interaction with the outside world". Some examples are mutating external variables... HTTP requests, writing to the DOM, writing to a database, logging etc.

- **Pure Functions:** _A function that has no side effects(does not change any variables outside it's scope) **Given the same input a pure function will always return the same output**_

```js
//pure function:
function add(a, b) {
  return a + b;
}
//impure function:
function add(a, b) {
  return a + b + Math.random();
}
```

#### Rules for Render Logic:

- **Components must be pure when it comes to render logic:** given the same props(input), a component instance sould always return the same JSX(output).
- **Render logic must produce no side effects:** no interaction with the "outside world" is allowed.
  - Do not perform network requests (API calls)
  - Do not start timers
  - Do not directly use the DOM API
  - Do not mutate variables outside the scope of the function (this is why we can't mutate props)
  - Do not update state (or Refs): this will create an infinite loop of renders.

---

#### State Update Batching:

- Renders are not triggered immediatly , but scheduled for when the JS engine has some "free time". There is also batching of multiple setState calls in event handlers.
- Updating state is asynchronous.
  ![Example](./images/2023-08-26-13-51-52.png)
  > example:

```js
function App() {
  const [answer, setAnswer] = useState("");
  const [best, setBest] = useState(true);
  const [solved, setSolved] = useState(false);
  function reset() {
    setAnswer("");
    console.log(answer);
    setBest(true);
    setSolved(false);
  }
  return (
    <div>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

- In the above example you might think that a render cycle takes place for each call to setState... but in reality the state updates are batched together and the render cycle is only triggered once.
- All three pieces of state in the event handler are updated at once.
  ![Batched State Update](./images/2023-08-26-14-00-09.png)

- If we need to update state based on a previous update, we use setState with a callback function.
  `setAnswer((prevAnswer) => prevAnswer + 'a');`

**Makin the tripple like button work:**

```js
function handleInc() {
  setLikes(likes + 1);
}
function trippleInc() {
  setLikes((prevLikes) => prevLikes + 1);
  setLikes((prevLikes) => prevLikes + 1);
  setLikes((prevLikes) => prevLikes + 1);
}
```

---

### Events in React:

- Event propagation and delegation: when a click event takes place on a button in the DOM tree... an event object is created at the root of the document.
- The event will travel down the DOM tree (until it reaches the target) during what is called the capturing phase.
- After the target is reached the event will travel back up the DOM tree during what is called the bubbling phase.
- By default all event handlers listen to events on the target and during the bubbling phase... so an event on a child element will trigger the event handler on a parent of the child during the bubbling phase.
- We can prevent this default behavior by calling the `stopPropagation()` method on the event object.
- The reason for this behavior is an important technique called **Event Delegation** which is the process of handling events for multiple elements in one single parent element.

![Event Delegation](./images/2023-08-28-10-31-58.png)

#### How React Handles Events:

![React Events](./images/2023-08-28-11-18-11.png)

**Synthetic Events:**

- When we create an event listener... react gives us access to an event object. In react, this event object is called a synthetic event... native events such as :(pointer event, mouse event, keyboard event) have wrappers around them to create synthetic events which expose the same interface... i.e. `stopPropagation()` and `preventDefault()` methods.
- The main difference between native events and synthetic events is that synthetic events are made such that they have the same behavior regardless of the browser.
- Most synthetic events bubble (including focus, blur and change), except for scroll (which does not bubble in react).
- In react event handlers are written with camel case... i.e. `onClick` instead of `onclick`.
- In vanilla JS default behavior can be prevented by returning false from the event handler... in react we use the `preventDefault()` method on the event object.
- In the rare case that you need to handle an event during the capture phase rather than the bubbling phase... you can use the `onClickCapture` prop instead of the `onClick` prop.

---

#### Libraries vs. Frameworks & The React Ecosystem:

- A framework is an all in one kit... it has everything you need but it locks you into certain ways of doing things.
- A library is a collection of tools that you can use to build your own solution.
- React is a library, Angular is a Framework.
- Next.js, Gatsby and Remix are frameworks built on top of React.

![React Ecosystem](./images/2023-08-28-12-06-09.png)

---

### Summary of React Fundamentals:

- A component is like a blueprint for a piece of UI that will eventually exist on the screen, when we use a component, React creates a component instance, which is the physical manifestation of the component, contaning props, state...etc. A component instance, when rendered will return a React element.
- Rendering only means calling component functions and calculating what DOM elements need to be inserted, deleted or updated. It has nothing to do with actually writing to the DOM. Therefore, each time a component instance is rendered and rerendered, the function is called again.
- Only the initial app render and state updates can cause a render, which happens for the entire application, not just one single component.
- When a component instance get's rerendered, all it's children will get rerendered as well. This does not mean that all children will get updated in the DOM, thanks to reconciliation, which checks which elements have actually changed between two renders.
- Diffing is how React decides which DOM elements need to be added or modified. If between renders, a certain React element stays at the same position in the element tree, the corresponding DOM elment and component state will stay the same. If the element changed to a different position, or if its a different element type, the DOM element and state will be destroyed.
- Giving elements a key prop allows React to distinguish between multiple component instances. When a key stays the same across renders, the element is kept int the DOM. This is why we use keys in lists. When we change the key between renders, the DOM element will be destroyed and rebuilt... this behavior can be leveraged to reset state.
- The logic that produces JSX output for a component instance ('render logic') is not allowed to produce any side effects: no API calls, no timersm no object or variable mutations, no state updates. Side effects are allowed in event handlers and useEffect hooks.
- The DOM is updated in the commit phase, but not by React, but by a 'renderer' called ReactDOM.
- Multiple state updates inside an event handler function are batched, so they all happen at once, causing only one rerender. This means we can not access a state variable immediatly after updating it: state updates are asynchronus. Since react 18, batching also happens in timeouts, promises and native event handlers.
- When uing events in event handlers, we get access to a synthetic event object, not the browser's native object, so events work the same way across all browsers. This difference is that most synthetic events bubble, including focus, blur and change, which do not bubble as native browser events. Only the scroll event does not bubble.

---

---

### Effects & Data Fetching:

**Component (instance) Lifecycle:**

- **Mount/ Initial Render** : component instance is rendered for the first time. Fresh state and props are created.
- **Update / Rerender** : component instance is rerendered because state or props changed, or because a parent component rerendered or Context changed.
- **Unmount** : component instance is removed from the DOM, state and props are destroyed as well.

**Why we need the useEffect Hook:**

- Effects run asynchronously after the component is painted to the browser.

```js
const [movies, setMovies] = useState([]);
const [watched, setWatched] = useState([]);
fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=batman`)
  .then((res) => res.json())
  .then((data) => setMovies(data.Search));
```

- This code results in an infinite loop of network requests

**useEffect** takes two arguments... a callback function and a dependency array.

- The callback function is called after the component is rendered for the first time and after every rerender.
- The dependency array is an array of values that the useEffect hook will watch for changes. If any of the values in the dependency array change between renders, the callback function will be called again.

```js
useEffect(() => {
  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=batman`)
    .then((res) => res.json())
    .then((data) => setMovies(data.Search));
}, []);
```

- In the case where the dependency array is empty, the callback function will only be called after the initial render (onMount).

- In the context of React... a side effect is any interaction between a component and the world outside the component. We can think of a side effect as 'code that actualy does something'. Examples include data fetching, setting up subscriptions, setting up timers, manually accessing the DOM etc...

**Where to create a side effect**

- Sometimes we want to initiate a side effect as a result of an event but other times we want to initiate a side effect when the component renders.

- The useEffect hook allows us to write code that will run at different points in the lifecycle of the component (mount, update, unmount).

![Event Handlers vs Effects](./images/2023-08-29-09-46-33.png)

- We use effects to keep a component synchronized with some external system... i.e. an API of movie data.

- Whenever possible...create side effects inside of an event handler rather than a useEffect hook.
- The function that is the first argument to useEffect must be synchronus so you have to put another function inside of it if you want to do something asyncronus.

```js
useEffect(() => {
  async function fetchMovies() {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
    );
    const data = await response.json();
    setMovies(data.Search);
  }
  fetchMovies();
}, [query]);
```

**With error and loading states... plus a finally block to run at the end incase of error or sucess to prevent loading state being true in case of error**

```js
useEffect(() => {
  async function fetchMovies() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
      );
      if (!response.ok)
        throw new Error("Something went wrong while fetching the movies");

      const data = await response.json();
      if (data.Response === "False") throw new Error("No movies found");
      setMovies(data.Search);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  if (query.length < 2) {
    setMovies([]);
    setError("");
    return;
    //if the query is empty or not long enough then we won't even try to fetch the movies
  }
  fetchMovies();
}, [query]);
```

**useEffect Dependency Array:**

- By default, effects run after every render. We can prevent that by passing a dependency array. Without the dependency array react doesn't know when to run the effect. Each time one of the dependencies changes, the effect will run again. If the dependency array is empty, the effect will only run after the initial render.

**Every state variable and prop used inside the effect MUST be included in the dependency array.**

> You can think of useEffect as an event listener that is listening for one dependency to change. When that dependency changes, the effect will run again.

|                        | Synchronization                          | Lifecycle                                                |
| ---------------------- | ---------------------------------------- | -------------------------------------------------------- |
| useEffect(fn, [x,y,z]) | Effect synchronizez with x,y and z       | Runs on mount and re-renders triggered by updating x,y,z |
| useEffect(fn, [])      | Effect synchronizes with not state/props | Runs only on mount(initial render)                       |
| useEffect(fn)          | Effect synchronizes with everything      | runs on every render (usually bad)                       |

**Order of effects based on dependency array**

```js
export default function App() {
  useEffect(() => {
    console.log("After initial render");
  }, []);
  useEffect(() => {
    console.log("After every render");
  });

  //----------------------
  console.log("During Render");
}
```

**Cleanup Function:**

- In useEffect a cleanup function is a function that is returned from the callback function. This function will be called before the next effect is run and before the component is unmounted.
- The cleanup function is also exicuted on rerenders before the effect is run again.
- The cleanup function is optional and if used is returned from the callback function in the useEffect hook.
- It runs on two occasions:
  1. Before the next effect is run.
  2. Before the component is unmounted.

**Use Case for Cleanup Function:**

- Whenever the side effect keeps happening after the component has been re-rendered or unmounted.
- For example you may have a http request in your effect and during the process of the request the component gets rerendered causing a new http request to be fired off (this specific issue is called a race condition).

![Cleanup Use Cases](./images/2023-08-30-10-26-21.png)

**Each effect should only do one thing**

- This makes effects easier to understand and it makes cleanup easier to write.

> Example:

```js
useEffect(() => {
  document.title = title || "Movie Details";
  //cleanup function
  return function () {
    document.title = "Movie List";
    console.log(`Cleanup for movie ${title}`); //star wars
  };
}, [title]);
```

- This cleanup function runs after the component has unmounted but the title is still star wars because the cleanup function is a closure which means it remembers all the variables that existed when it was created.

**How to abort excess http requests using cleanup function**

```js
useEffect(() => {
  const controller = new AbortController();

  async function fetchMovies() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
        { signal: controller.signal }
      );

      if (!response.ok)
        throw new Error("Something went wrong while fetching the movies");

      const data = await response.json();
      if (data.Response === "False") throw new Error("No movies found");

      setMovies(data.Search);
      setError("");
    } catch (err) {
      //if check prevents the error from being set if the request was aborted (JS considers this an error but in this case we meant to do it)
      if (err.name === "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }
  if (query.length < 3) {
    setMovies([]);
    setError("");
    return;
  }

  fetchMovies();
  return function () {
    controller.abort();
  };
}, [query]);
```

**How to close MovieDetail when escape key is pressed**

```js
useEffect(() => {
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      handleCloseMovie();
      console.log("Escape key pressed");
    }
  });
}, []);
```

**How to use a cleanup function to remove an event listener**

```js
//-----Escape Key Effect-----//
useEffect(() => {
  function handleKeyPress(event) {
    if (event.code === "Escape") {
      onCloseMovie();
      console.log("Escape key pressed");
    }
  }

  document.addEventListener("keydown", handleKeyPress);
  return function () {
    document.removeEventListener("keydown", handleKeyPress);
  };
}, [onCloseMovie]);
```

---

---

## React Hooks

- React hooks are special built in functions that allow us to hook into the internal functionality of React.
  -i.e. Creating and accesing state from the Fiber Tree

  - registering side effects in the Fiber tree.
  - Manual manipulation of the DOM.

- Hooks always start with the word `use` i.e. `useState` or `useEffect` or `useRef` etc...
- Enable easy reuse of non-visual logic: we can compose multiple hooks into our own custom hooks.
- Hooks gave functional components the ability to have their own state and run side effects at different points in the lifecycle of the component (previously, this was only possible with class components).

**Rules of Hooks**

1. Hooks can only be used at the top level of the component.

- This means do not call hooks inside conditionals, loops or nested functions or after early return. (this ensures that hooks are always called in the same order which is important for the fiber tree which is a linked list of hooks... that only have a link to the next hook in the list)

2. Only call hooks from React Functions.

- This means you can only call a hook from a function component or a custom hook.

**You don't need to wory about these rules if you use a linter like eslint-plugin-react-hooks**

**Persisting watched movies in local storage (Method 1):**

```js
function handleAddWatched(movie) {
  setWatched((watched) => [...watched, movie]);
  localStorage.setItem("watched", JSON.stringify([...watched, movie]));
}
```

**useState Hook:**

- We can use a callback to update state... but we can also use a callback to initialize state(lazy initial state).

```js
const [watched, setWatched] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("watched"));
  return saved ? saved : [];
});

//----------Save watched movie to local storage----------//

useEffect(() => {
  localStorage.setItem("watched", JSON.stringify(watched));
}, [watched]);
```

```js
//We do not need to do this because the useEffect runs every time the component is rendered and the state is updated... which does the same thing anyway.
function handleDeleteWatched(id) {
  setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  localStorage.setItem(
    "watched",
    JSON.stringify(watched.filter((movie) => movie.imdbID !== id))
  );
}
```

#### useState Summary:

- We use the useState hook to create and update state.

```js
const [state, setState] = useState(initialState);
```

- We can also use a callback function to initialize state (lazy initial state).
- In this case, the function must be pure(no side effects) and accept no arguments, it is only called on the initial render.

```js
const [watched, setWatched] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("watched"));
  return saved ? saved : [];
});
```

- **Updating State**
- We can update state by calling the setState function returned from useState and passing in a value or a callback function.

```js
setWatched({imdbID: "tt2527336", title: "Star Wars: Episode VIII - The Last Jedi", year: "2017", userRating: 8,…})
// or
setWatched((watched) => [...watched, movie]);
```

- Remember that when updating state you must NOT mutate objects or arrays... instead you must replace them.

---

### Refs:

**How not to select DOM elements in React**

- This works but it is not the React way of doing things and the direct DOM manipulation will at best slow down the performance.
- Also, if you were to add a dependency to the useEffect you would focus the element over and over again...

```js
useEffect(() => {
  const el = document.querySelector(".search");
  console.log(el);
  el.focus();
}, []);
```

#### useRef Hook:

- A Ref is like a "box" with a mutable `.current` property that is persisted across renders ("normal" variables are always reset on rerenders).

![mutable .current property](./images/2023-09-11-10-59-02.png)

- This gives us two main use cases:

1. Creating variables that stay the same between renders (i.e. previous state, setTmeout id, etc...)
2. Selecting and storing DOM elements.

   - We ususally mutate the current property of a Ref inside of a useEffect.

_Refs are for data that is NOT rendered: usually ony appear in event handlers or effects, not in JSX (otherwise we use state)_

![State vs Refs](./images/2023-09-11-12-16-06.png)

![Updating state vs refs](./images/2023-09-11-12-17-13.png)

**How to fucus the search bar using a REF**

```js
const searchInputRef = useRef(null);

useEffect(() => {
  searchInputRef.current.focus();
}, []);
```

> In the example above the `searchInputRef.current` is the DOM element that the ref is pointing to.

---

### Custom Hooks:

- Allow us to reuse non-visual logic in multiple components.
- One custom hook should have only one purpose (in order to make it reusable).
- The normal rules of hooks apply to custom hooks too.
- Custom hooks always need to use one or more react hooks.
- Custom hooks are functions that need to start with the word `use` i.e. `useFetch` or `useLocalStorage` etc...

  ![Custom Hooks & Reusable Logic](./images/2023-09-11-13-40-35.png)

> Example:

```js
function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return [data, loading];
}
```

**Two main use cases for custom hooks:**

1. ) Reuse stateful logic between components

```js
import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(key));
    return saved ? saved : initialState;
  });

  //----------Save watched movie to local storage----------//

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
```

> Another example:

```js
//-----------useKeypress Hook-----------//
export function useKeypress(key, action) {
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        action();
        console.log(`${key} key pressed`);
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    return function () {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [action, key]);
}
//----------------------------------//
//-------------in Search.js-------------//
useKeypress("Enter", () => {
  if (document.activeElement === searchInputRef.current) return;
  searchInputRef.current.focus();
  //clear text in search bar.
  setQuery("");
});
//---------------in MovieDetail.js-------------------//
useKeypress("Escape", onCloseMovie);
// where on onCloseMovie is a prop passed in from App.js
```

2. ) Abstract away complex logic into a custom hook

```js
import { useEffect, useState } from "react";

export function useMovies(query, callback, key) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );

        if (!response.ok)
          throw new Error("Something went wrong while fetching the movies");

        const data = await response.json();
        if (data.Response === "False") throw new Error("No movies found");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name === "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
    return function () {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, key]);
  return { movies, loading, error };
}
```

---

---

### useReducer hook:
