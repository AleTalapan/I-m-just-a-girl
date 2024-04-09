import './Header.css'

const Header = () => {
  return (
   <header>
    <nav>
      <ul>
        <li><a href="#" className='friends'>Friends</a></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">My Profile</a></li>
        <li><a href="#">Journal</a></li>
        <li><a href="#" className='log-out'>Log Out</a></li>
      </ul>
    </nav>

    </header>
  )
}

export default Header