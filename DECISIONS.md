- Architecture Decisions and Rationale

The backend handles all core logic, including calculating subscription renewal dates, storing data, and providing RESTful endpoints for the frontend.

I chose React with TypeScript for the frontend because it makes building interactive dashboards easier, provides type safety, and I personally enjoy working with React.

I separated the backend and frontend into different folders (backend/ and frontend/) to keep the project organized and maintain a clean structure.


- Challenges Faced and Solutions

Renewal date auto calculation: Initially, the system forced every subscription to have a renewal date exactly one month from the start date, which caused problems when testing “expiring soon” subscriptions.

Solution: Updated the save() method to calculate renewal dates correctly based on billing cycle and allowed manual override for testing.

Frontend type errors with subscriptions: TypeScript was complaining about types when fetching data from the backend.

Solution: Temporarily used any[] for state to make the table work while continuing to improve typing later.

GitHub collaboration: I wasn’t sure when to share the repo with others.

Solution: Decided to share only after implementing core functionality to avoid confusion.


- AI Tools Used and Validation

I used GitHub Copilot to get guidance on Django models, DRF endpoints, since this is the second time working on django.

I validated AI output by testing it in my local environment, checking database entries, and making sure the data and UI worked as expected.

I only used AI as a learning and guidance tool, not for copy pasting entire sol.


- Trade offs Made and Why

I used a simple table for displaying subscriptions instead of advanced charts or visualizations because the core assignment required CRUD operations and cost analytics first.

I focused on functionality first, then enhancements like alert highlights and savings calculator could be added later.


- What I Learned During the Process

How to structure a full stack project using django as backend.

How to create Django models, serializers, and DRF viewsets for CRUD operations.

How to fetch data in React and update the UI dynamically from django rest framework.

How to handle date calculations in Python and manage edge cases like “expiring soon.”

How to debug type issues in TypeScript when connecting frontend and backend.


- Future Improvements

Add charts and visualizations for cost analysis using a library like Chart.js or Recharts.

Add alerts or highlights for subscriptions expiring within 7 days.

Add a savings calculator to show the benefit of switching billing cycles.

Improve frontend form validation and typing in TypeScript for better user experience.

Make the design responsive across all devices so it works well on desktops, tablets, and mobile phones.
