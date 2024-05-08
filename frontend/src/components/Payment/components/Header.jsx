import { Avatar, Dropdown, DropdownHeader, DropdownItem, Navbar, NavbarToggle, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "flowbite-react";
//import {useSelector , useDispatch} from 'react-redux';
//import { signOutSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {

    const path = useLocation().pathname;
    //const dispatch = useDispatch();
    //const {currentUser} = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleSignOut = async () => {
      try{
        const res = await fetch('/api/user/signout' , {
          method: 'POST'
        });
        const data = await res.json();
        if(res.ok){
          //dispatch(signOutSuccess());
          navigate('/');
        }else{
          console.log(data.message);
        }

      }catch(error){
        console.log(error.message);
      }
    }

  return (
    <Navbar className="bg-black text-white">
       {/* <Navbar.Toggle className="bg-black"/>*/}
      <div className="">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Space
          </span>
          View
        </Link>
      </div>
    
      <Navbar.Collapse className="text-white">
        <Navbar.Link active={path === "/apod"} as={'div'}>
      <Link className="text-white" to="/apod">APOD</Link>
          
        </Navbar.Link>
        <Navbar.Link active={path === "/earth"} as={'div'}>
        <Link className="text-white" to="/earth">Earth</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/mars"} as={'div'}> 
        <Link className="text-white" to="/mars">Mars Rover</Link>
        </Navbar.Link>
      </Navbar.Collapse>

      <div>
        

        
        <Link to="/" >
          <Button gradientDuoTone="purpleToBlue" >
            Sign In
          </Button>
        </Link>
      </div>
    </Navbar>
  );
}
