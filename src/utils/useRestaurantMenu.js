import { useEffect ,useState} from "react"
import { MENU_API_URL } from "./constant";

 const useRestaurantMenu=(resId)=>{


    let [resInfo, setresInfo] = useState(null);

      
    const fetchMenu = async () => {
        const data = await fetch(
          MENU_API_URL+resId +"&catalog_qa=undefined&submitAction=ENTER"
        );
        const jsondata = await data.json();
        
        setresInfo(jsondata?.data);
      };
    useEffect(() => {
        fetchMenu();
      }, []);
  
    return resInfo
}
export default useRestaurantMenu;