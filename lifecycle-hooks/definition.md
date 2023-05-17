# Definition
Each vue component instance goes through a series of intialization steps when its created. for example, data observation, compile the template, mount the instance to the DOM, update the dom when data changes. Along this way it call some lifecycle hooks function to allow user to add their own code at specific stages. By using these hooks, you will know when your component is created, added to the DOM, updated, or destroyed

1. Data Observation
2. Compile the Template
3. Mount the instance to the DOM
4. Update the DOM when data changes
