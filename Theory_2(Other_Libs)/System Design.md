<div style="font-size: 17px;background: black;padding: 2rem;">

System design in the front end involves planning and structuring the architecture of a web application to ensure scalability, maintainability, performance, and a good user experience. 

# Requirements Gathering

Requirement gathering is the process of identifying and defining a project's needs from start to finish. The goal of requirement gathering is to understand what's being built and why, and to define the features that will translate ideas into a tangible product. Requirement gathering usually takes place during the project initiation phase, but it's important to continue managing requirements throughout the entire project timeline. Requirements are broadly categorized into <span style="color: Cyan;">functional</span> and <span style="color: Yellow;">non-functional</span> requirements.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Functional Requirements</h3>

Functional requirements define the specific behavior or functions of a system. They describe what the system should do and include tasks, operations, data manipulation, processing, and other activities. These requirements are crucial for developers to understand what features to implement. Let's take a look at functional requirements of an e-commerce site:

- <b style="color: Violet;">User Authentication</b>
    - **Login:** The system must allow users to log in using their email and password.
    - **Registration:** The system must provide a registration form for new users to create an account.
    - **Password Recovery:** The system must allow users to reset their password via email.
- <b style="color: Violet;">Shopping Cart</b>
    - **Add to Cart:** Users must be able to add items to their shopping cart.
    - **View Cart:** Users must be able to view the items in their shopping cart.
    - **Update Quantity:** Users must be able to update the quantity of items in their cart.
    - **Remove Items:** Users must be able to remove items from their cart.
- <b style="color:Violet;">Product Search</b>
    - **Search Bar:** The system must provide a search bar where users can enter keywords to search for products.
    - **Search Results:** The system must display a list of products matching the search criteria.
    - **Filter Results:** Users must be able to filter search results by categories, price, and ratings.

- <b style="color:Violet;">Checkout Process</b>
    - **Address Entry:** The system must allow users to enter a shipping address.
    - **Payment Options:** The system must support multiple payment methods, such as credit card and PayPal.
    - **Order Summary:** The system must display an order summary before confirming the purchase.
    - **Order Confirmation:** The system must send an order confirmation email to the user.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Non-Functional Requirements</h3>

Non-functional requirements define the system's quality attributes, including performance, usability, reliability, and other constraints. They describe how the system should behave and are crucial for ensuring a positive user experience and system efficiency. Non-functional requirements for e-commerce sit are:

- **Performance:** Core Web Vitals, Asset Optimization (CSS, JS, Images), CSR/SSR
- **Logging and monitoring**
- **Device compatibility:** Check if application is compatible with variety of systems and make it responsive if needed.
- **Accessibility:** The application must be accessible to users with disabilities and comply with WCAG 2.1 AA standards.
- **Error Handling:** UI should handle error scenarios with apt error messages.
- **User Interface:** The system must provide a consistent and intuitive user interface across all pages.
- **Data Backup:** The system must perform daily backups of user data.
- **Scalability:** System should be able to handle increased load
- **Offline Support**
- **Internationalisation (i18) and Localisation**
- **Security:**
    - Data Encryption: All sensitive data must be encrypted in transit and at rest.
    - Authentication: The system must use multi-factor authentication for administrative access.
    - Authorization: The system must ensure that users can only access resources they are authorized to view.
- **Caching:** In local storage/session storage/index db.
- **Testing:** Unit test cases, A/B Testing, etc.
- **Versioning**
- **PWA (Progressive Wev Apps)**
- **CI/CD Build pipelines:** Deployment on production, etc

<br>

# High Level and Low Level Design

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Architecture</h3>

In the ever-evolving landscape of web development, choosing the right architectural approach is crucial to building scalable, maintainable, and efficient applications. Describes the overall architecture, such as `Single Page Application (SPA)`, `Multi-Page Application (MPA)`, or `Progressive Web App (PWA)`.

After that, two popular options that have gained significant attention in recent years are <b style="color: Cyan;">monolithic</b> and <b style="color: Yellow;">micro-frontend</b> architectures. Both have their merits and trade-offs and understanding their differences is essential for making informed decisions.

<b style="color:Salmon;">Monolithic Architecture:</b>

A monolithic architecture means that the entire front-end application is built as a single, unified codebase. All components, features, and modules are tightly integrated into one application.

<h4><u>Advantages</u></h4>

- **Simpler Initial Development:** Easier to set up and start development, but becomes challenging as the application grows.
- **Easier Testing:** Testing can be straightforward as all parts of the application are in one place.
- **Less Overhead:** Lower operational overhead since there is only one codebase and one deployment pipeline.

<h4><u>Disadvantages</u></h4>

- **Scalability Issues:** Limited scalability due to tightly coupled components and a single codebase.
- **Slower Development:** Single repository and single build pipeline. All developers work on the same codebase, which can lead to merge conflicts and slower integration.
- **Deployment Challenges:** Even small changes require redeploying the entire application, which can lead to longer deployment times and potential downtimes.
- **Tightly Coupled:** Changes in one part of the application can have unforeseen impacts on other parts, making maintenance challenging.
- **Limited Technology Choices:** With this architecture, you are limitated to the same technology stack for all components. This can restrict your ability to adopt new technologies or frameworks for specific parts of the application.

Initial load times can be slower due to the size of the application, but subsequent navigation can be faster if well-optimized.

<b style="color:Salmon;">Micro-frontend Architecture:</b>

Micro-frontend architecture takes an alternative approach, aiming to decompose the application into multiple loosely coupled, independent front-end components. Each component, often referred to as a micro-frontend, represents a specific feature or functionality of the application. These micro-frontends can be developed, tested, deployed, and scaled independently.

<h4><u>Advantages</u></h4>

- **Scalability:** Easier to scale development by allowing multiple teams to work on different microfrontends simultaneously.
- **Independent Deployment:** Changes in one microfrontend do not require redeploying the entire application, reducing deployment times and risks.
- **Technology Agnostic:** Different microfrontends can use different technologies, frameworks, or libraries, allowing teams to choose the best tool for their needs.
- **Improved Maintainability:** Smaller, more manageable codebases improve maintainability and allow for faster iterations.

<h4><u>Disadvantages</u></h4>

- **Increased Complexity:** Managing multiple micro-frontends introduces additional complexity, especially in terms of inter-component communication, shared state management, and routing. Setting up and managing multiple microfrontends can be complex, requiring more sophisticated build and deployment pipelines.
- **Overhead and Performance:** These architectures rely on inter-component communication through APIs or message passing. This can introduce additional network overhead, impacting performance compared to a monolithic architecture.
- **Learning Curve:** Adopting this architecture requires learning new patterns, techniques, and tools. This learning curve can be a challenge, especially for teams accustomed to traditional monolithic development.

Can optimize load times by lazy loading microfrontends. However, managing multiple microfrontends can introduce performance overhead if not managed properly.

<br>

<div style="border: 2px solid green; padding: 10px;">
<b style="color: Cyan;">Monolithic Architecture</b> is suitable for small to medium-sized projects with limited scalability needs and a small development team. It is also a good fit when there is a requirement for simplicity and a quick development cycle. It is better for smaller teams where communication is straightforward.
<br></br>

<b style="color: Yellow;">Micro-frontend Architecture</b> is more suitable for large and complex projects with multiple teams working independently. It is ideal when there is a need for independent deployment, scalability, and technology diversity, and when the benefits outweigh the added complexity. It is better for larger, distributed teams that can work independently on different parts of the application.
</div>

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Communication protocols</h3>

- <b style="color:Salmon;">RESTful APIs</b>: Standard way of communication between front-end and back-end. Using libraries like `Axios` or `Fetch` API.
- <b style="color:Salmon;">GraphQL</b>: More flexible query language for APIs. With GraphQL, the frontend can request exactly the data it needs, no more and no less. Libraries like `Apollo Client` or `Relay`.
- <b style="color:Salmon;">WebSockets</b>: WebSockets are different from traditional HTTP requests, which are one-way and require a new connection for each request. With WebSockets, communication can be continuous, and the server can send messages to connected clients. This allows for interactive communication sessions, such as sending messages to a server and receiving event-driven responses. Libraries like `Socket.io`.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Security</h3>

- **Cross-Site Scripting (XSS):** Sanitizing user input, using libraries like `DOMPurify`.
- **Cross-Site Request Forgery (CSRF):** Using tokens to verify requests.
- **Content Security Policy (CSP):** Preventing malicious scripts.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Build and Deployment</h3>

- <b style="color:Salmon;">Build Tools</b>: `Webpack`, `Parcel`, `Rollup` for bundling. `Babel` for transpiling ES6+ code.
- <b style="color:Salmon;">Continuous Integration/Continuous Deployment (CI/CD)</b>: Automated testing and deployment using tools like `Jenkins`, `GitHub Actions`, `Travis CI`.
- <b style="color:Salmon;">Hosting</b>: Hosting static files on platforms like `Netlify`, `Vercel`, or traditional servers.


<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Testing</h3>

- <b style="color:Salmon;">Unit Testing</b>: Testing individual components or functions. Libraries like `Jest`, `Mocha`, `Jasmine`.
- <b style="color:Salmon;">Integration Testing</b>: Testing combinations of components or modules. Libraries like `React Testing Library`.
- <b style="color:Salmon;">End-to-End (E2E) Testing</b>: Testing the entire application workflow. Tools like `Cypress`, `Selenium`.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Monitoring and Analytics</h3>

Using tools like `Google Analytics`, `Sentry` for error tracking, and `LogRocket` for session recording.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Routing</h3>

Defines the primary routes and navigation flow within the application. This includes the main pages and their URLs.

- <b style="color:Salmon;">Client-side routing:</b> Using libraries like React Router, Vue Router, or Angular Router to handle navigation without full page reloads.
- <b style="color:Salmon;">Dynamic Routing:</b> Handling routes dynamically based on data (e.g., user profiles, product pages).

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Performance Optimization</h3>

- <b style="color:Salmon;">Code Splitting</b>: Loading only the required code for a page. Using tools like `Webpack`’s dynamic imports.
- <b style="color:Salmon;">Lazy Loading</b>: Delaying the loading of components or images until they are needed.
- <b style="color:Salmon;">Caching</b>: Using service workers, local storage, or IndexedDB for caching assets and data.
- <b style="color:Salmon;">Minification and Compression</b>: Minifying JavaScript and CSS files. Using `Gzip` or `Brotli` compression.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Component Design</h3>

- <b style="color: Salmon;">Atomic Design</b>
    - **Atoms:** Basic building blocks (e.g., buttons, inputs).
    - **Molecules:** Combinations of atoms (e.g., form groups).
    - **Organisms:** More complex UI components (e.g., navigation bars, forms).
    - **Templates:** Layouts comprising organisms.
    - **Pages:** Specific instances of templates with real data.

- <b style="color: Salmon;">Component-Based Frameworks</b>
    - **React:** Functional components, hooks, state management libraries like Redux or Context API.
    - **Vue.js:** Single-file components, Vuex for state management.
    - **Angular:** Dependency injection, services, and component-based architecture.


<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">State Management</h3>

- <b style="color: Salmon;">Local State</b>: Managed within individual components using hooks or local state.
- <b style="color: Salmon;">Global State</b>: Libraries like `Redux`, `MobX`, or `Context` API in React. 
- <b style="color: Salmon;">Server State</b>: Data fetched from APIs and cached or managed using libraries like `React Query` or `SWR`.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Styling</h3>

- <b style="color: Salmon;">CSS Frameworks</b>: `Bootstrap`, `Tailwind CSS`, `Material-UI`.
- <b style="color: Salmon;">CSS-in-JS</b>: `Styled-components`, `Emotion` in React.
- <b style="color: Salmon;">Preprocessors</b>: `SASS`, `LESS` for more powerful styling.

</div>

<!-- <div style="font-size: 17px;background: black;padding: 2rem;"> -->
<!-- <div style="background: DarkRed;padding: 0.3rem 0.8rem;"> [HIGHLIGHT] -->
<!-- <h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;"> [SUBHEADING] -->
<!-- <b style="color: Chartreuse;"> [NOTE] -->
<!-- <b style="color:red;"> [NOTE-2] -->
<!-- <span style="color: Cyan;"> [IMP] -></span> -->
<!-- <b style="color: Salmon;"> [POINT] -->
<!-- <div style="border: 1px solid yellow; padding: 10px;"> [BORDER] -->

