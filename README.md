
# AB Challenge
Ed Ryan  
June 21, 2019

### Requirements

- Should match the attached mockups  
- Should use a modern JS framework  
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
Imported modules are used. **react-datepicker** allows us to pick the date and time while **react-select** manages the dropdown menu.

### The src folder
As usual - src holds most of the application logic. 

**/assets** contains static files and constants.  
**/utils** contains functions related to the acquisition or parsing of data.  
**/styles** contains stylings.  

### A word on stylings
My approach to styling folder structure is largely inspired by [David Khourshid's primer](https://hugogiraudel.com/2015/06/18/styling-react-components-in-sass/) on namespacing in styling - the most disheartening thing in the world is not understanding why your CSS isn't affecting the page, and a proactive approach to namespacing keeps those moments from happening. I do the following:
1. Reset my browser defaults.
2. Then, define global stylings. These go in main.scss.
3. Next come component and container stylings. These are imported via their respective **_all.scss** files.

All component stylings are nested within the top-level component's div class. This ensures that stylings in one component will never pollute another. If you get rid of the component, delete its corresponding styling file. Finally, component stylings have precedence over global stylings, since they're imported last.


### Neat features
1. I've guarded sensitive information (in particular, the API key) within an **.env** file. Env variable loading happens prior to bundling in the Webpack config.
2. Custom React Hooks makes for easy form input binding - check out the ModalCreateBooking component.
3. Fairly good separation of concerns. As an example - the dropdowns, filter, and GET request all reference the bookingTypes array located in assets/constants.js. To add a booking type, just edit the constants file.
 
### To do
1. The veil behind the modal has strange rendering behavior when the document is larger than the viewport.
2. Media rules to collapse the flexbox when the document width gets too tiny.
3. Pagination isn't implemented yet.
4. Currently, the API is hit everytime the page is refreshed, and every time the filter button is clicked. There are upsides and downsides to this - the big downside is that I don't really consider this implementation scalable. These responses should proabably be cached, but the way in which we go about doing it really depends on the context - DB load, peak/average number of users, etc. 
5. Unit testing.

### Thanks
Thank you for taking the time to look through the application!  
Let me know if you have any questions or thoughts.  
  
-Ed Ryan
