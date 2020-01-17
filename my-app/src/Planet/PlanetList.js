import React from 'react'; 
import './Planet.css'; 

export class PlanetList extends React.Component { 
   constructor(props) { 
      super(props); 
      this.state = { 
         next:"", 
         prev:"", 
         planets: [], 
         planetDetails: {} 
      } 
      this.loadOtherPlanets = this.loadOtherPlanets.bind(this); 
      this.loadPlanetDetails = this.loadPlanetDetails.bind(this); 
   }; 
   
   componentDidMount() { 
      this.loadOtherPlanets(null); 
   }; 
   
   loadOtherPlanets(apiUrl) {
      if(apiUrl == null) { 
         apiUrl = 'https://swapi.co/api/planets/';
      } 
      fetch(apiUrl).then(
         res => res.json()).then( 
            (response) => { 
               this.setState({ 
                  next: response.next, 
                  prev:response.previous, 
                  planets: response.results 
            }); 
      }) 
   }; 
   
   loadPlanetDetails(apiUrl) {
      if(apiUrl) { 
         fetch(apiUrl).then(
            res => res.json()).then(
               (response) => { 
                  this.setState({ planetDetails: response }); 
            }) 
      } 
   }; 
render() { 
   const { planets } = this.state; 
   return (
         <div className="planet_Details_container">
            <h1>StarWars Universe</h1>
            <div className="planet_panel planet_list">
               <h2>Planets</h2>
               <table>
                     <tbody>
                        {planets ? planets.map((planet, i) =>
                        <tr>
                           <td>
                                 <button className="planet_name" onClick={()=> this.loadPlanetDetails(planet.url)}>{planet.name}</button>
                           </td>
                        </tr>) : "Its cloud"}
                     </tbody>
               </table>
               <button className="nav_button" onClick={()=> this.loadOtherPlanets(this.state.prev)}>Previous</button>
               <button className="nav_button" onClick={()=> this.loadOtherPlanets(this.state.next)}>Next</button>
            </div>
            <div className="planet_panel planet_Details">
               <h2>Details of the planet</h2> {this.state.planetDetails.name ?
               <DetailsTable data={this.state.planetDetails} /> : "Click on Planet to see details"}
            </div>
         </div>
      );    
   } 
} 
class DetailsTable extends React.Component { 
   render() { 
      return (
         <table>
            <thead>Details of Planet: <span className="planet_name_title">{this.props.data.name}</span></thead>
            <tbody>
               <tr>
                     <td>Rotation Period</td>
                     <td>{this.props.data.rotation_period}</td>
               </tr>
               <tr>
                     <td>Orbital Period</td>
                     <td>{this.props.data.orbital_period}</td>
               </tr>
               <tr>
                     <td>Diameter</td>
                     <td>{this.props.data.diameter}</td>
               </tr>
               <tr>
                     <td>Climate</td>
                     <td>{this.props.data.climate}</td>
               </tr>
               <tr>
                     <td>Gravity</td>
                     <td>{this.props.data.gravity}</td>
               </tr>
               <tr>
                     <td>Terrain</td>
                     <td>{this.props.data.terrain}</td>
               </tr>
               <tr>
                     <td>Surface Water</td>
                     <td>{this.props.data.surface_water}</td>
               </tr>
               <tr>
                     <td>Population</td>
                     <td>{this.props.data.population}</td>
               </tr>
            </tbody>
         </table>
      ); 
   } 
}