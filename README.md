
# AB Challenge
Ed Ryan, June 19, 2019

### Requirements

- Should match the attached mockups
- Should use a modern JS framework (we use React, but use whatever is most comfortable for you)
- Should support creating and displaying two types of bookings: 
-- Housekeeping 
-- Dog walks
- Should let the user create a new booking and require the following data:
-- Email
-- Name
-- Address
-- Booking Type (housekeeping, dog walk)
-- Booking Date
-- Booking Time
-- Should list bookings in ascending order by date

### General overview
All basic requirements are fulfilled.
**React** is our weapon of choice. 
Our bundling tool is **Webpack**.
Stylings are provided via **Sass** and in-lined with Webpack.
State is managed via **Hooks**. 
Virtually every component is a functional component.
Imported modules are used. **react-datepicker** allows us to pick the date and time while **react-dropdown** manages the dropdown menu.

### The src folder
As usual - src holds most of the application logic. 

**/assets** contains static files and constants.
**/utils** contains functions related to the acquisition or parsing of data.
**/styles** contains stylings. 

### A word on stylings
My approach to styling folder structure is largely inspired by [David Khourshid's primer](https://hugogiraudel.com/2015/06/18/styling-react-components-in-sass/) on namespacing in styling - the most disheartening thing in the world is not understanding why your CSS isn't affecting the page, and a proactive approach to namespacing wards that off nicely. In short, I do the following in order:
1. Reset my browser defaults.
2. Then, define global stylings. These go in main.scss.
3. Next come component and container stylings. These are imported via their respective **_all.scss** files.

This approach does two things: Firstly, all component stylings are given as children their class. Stylings in one component will never pollute another component. If you get rid of the component, just blow up its corresponding styling file. Secondly, it gives component stylings dibs. Since the component stylings are imported last, they'll have precedence over global stylings - which is what we want.


### Neat features
1. I've guarded sensitive information (in particular, the API key) within an **.env** file. Env variable loading happens prior to bundling in the Webpack config.
2. Custom React Hooks makes for easy form input binding - check out the ModalCreateBooking component.
3. Fairly good separation of concerns. Components are primarily concerned with the display of information. Functions that massage data live in their own part of the codebase.
 
### To do
1. Provide some kind of feedback to the user while the booking is being created - something like a activity indicator.
2. The veil behind the modal has strange rendering behavior when the document is larger than the viewport.
3. Media rules to collapse the flexbox when the document width gets too tiny.
4. Generalize my GET request to the API. Right now, getBookings is also parsing the data. I also want the GET request method to take arguments so I have some amount of programmatic control over filtering and skipping.

### Thanks
Thank you for taking the time to look through the application! Let me know if you have any questions or thoughts.
-Ed Ryan