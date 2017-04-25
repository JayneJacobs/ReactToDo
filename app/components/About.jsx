var React = require('react');
var {Link} = require('react-router');
var About = (props) => {


    return(
      <div>
          <h1>About</h1>
          <p>Author: Jayne Jacobs</p>

              <li>
                  <a href='http://jaynejacobs.com'>jaynejacobs.com</a>
              </li>
              <li>
                    <a href='https://github.com/JayneJacobs'>GitHub Link</a>
              </li>
              <p>  </p>


    <p>This is for the simplicity of just finding the current temperature in a city.
      If you have any comments or suggestions, please feel free to email me here</p>
            <li>
                <a href='mailto:jaynejacobs@jaynejacobs.com'>jaynejacobs@jaynejacobs.com</a>
           </li>
           <p>  </p>

    <p>Here are some of my sources:  </p>

            <li>
              <a href='https://facebook.github.io/react'>JavaScript Framework</a>
            </li>

            <li>
                <a href='https://openweathermap.org'>Open Weather Map</a>
            </li>

  </div>

    )
  }

module.exports = About;
