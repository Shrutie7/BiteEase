#   Namaste React 







# parcel
created a 
-Dev Build 
-Local Server 
- HMR - hot module replacement 
-File Watching Algorithm -written in C++
-Caching Faster builds  inside parcel-cache file
-Image Optimization
-Minification of file for production build
-Bundling of files 
-Compressing file 
-Consistent Hashing
-Code Splitting - split your files 
-Differential Bundling -  to support older browsers also
-Diagonistics
-Good Error handling / Better error Suggestions
-Gives a way to host app on HTTPS also - apps that work only on SSL using npm parcel index.html --https 
-Does tree shaking - removes unused code
-transpilation
-has lazy mode - load browser lazily 
-different dev and production bundles

# Namaste Food
-Header 
    -logo
    -Nav items

-Body
    -search
    -RestaurantContainer
    -RestaurantCard
       -img
       -name of res, rating,cuisine,pricefor2,delivery time

-Footer
    -copyright
    -links
    -Address
    -Contact
 

TWO TYPE OF EXPORT AND IMPORT 

- Default Export/Import :
* write export default 
export default <component/variable name>
* without curly braces
import  <component/variable name> from "path"



- Named Export/Import :
* write export in front 
export const <component/variable name>
* with curly braces
import {<component/variable name>} from "path" 

# React hooks
(normal js utlity functions)
- useState()-superpoweful state variable in react
- useEffect()

# 2 types of routing in web applications
- Clientside Routing 
- Serverside Routing


# Redux 
- Install @reduxjs/toolkit and react-redux
- Build our store (configureStore from @reduxjs/toolkit)
- Connect store to our app (Provider from react-redux)
- Slice (create cart slice inside configureStore)
- Dispatch action call reducer function 
- Selector to read store data