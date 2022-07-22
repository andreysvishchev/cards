import Button from "../button/Button"
import logo from '../../img/logo.svg'


export const Header = () => {
  return (
    <header className="header">
      <div className="container container--header">
        <a href="#" className="logo">
          <img src={logo} alt="Logo" />
        </a>
        <Button title='Sign in' />
      </div>
    </header>
  )
}
