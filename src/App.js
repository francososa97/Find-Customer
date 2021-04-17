import { Box, Container } from '@material-ui/core';
import CustomerListResults from './Componentes/CustomerListResults';
import CustomerListToolbar from './Componentes/CustomerListToolbar';
import customersMock from './Mock/Customers';
import './App.css';
import { useState } from 'react';

const SetSelectOption = (customers)=>{
  let allOptions = Object.keys(customers[0]);
  let options = allOptions.filter(x=> x != "id" && x != "avatarUrl")
  return options;
}

function App() {
  const [customers, SetCustomers] = useState(customersMock);
  const [properyOption , SetproperyOption] = useState(SetSelectOption(customersMock));
  const [selectedProperyOPtion,SetSelectedProperyOPtion] = useState("none");


  const findIntems = (property) => {
    let arregloNuevo = [];
    let i=0;
    let foundProperty="";
    if(property.length != 0)
    {
      customers.forEach((customer,key) => {
        for (key in customer) {
            if(selectedProperyOPtion === "none")
            {

              switch(key){
                case "address":
                  foundProperty = `${customer[key].city}, ${customer[key].state}, ${customer[key].country}`;
                  break;
                case "email":
                  foundProperty = customer[key];
                  break;
                case "name":
                  foundProperty = customer[key];
                  break;
                case "phone":
                  foundProperty = customer[key];
                  break;
                case "avatarUrl":
                  foundProperty = customer[key];
                  break;
                default: foundProperty  = " ";
                break;
              }
              foundProperty = foundProperty.toLowerCase();
              property=property.toLowerCase();
              let isResult= foundProperty.includes(property);
              if(isResult)
              arregloNuevo[i]= customer;
            }
            else if(selectedProperyOPtion === key){

               
                if(key === "address")
                  foundProperty = `${customer[key].city}, ${customer[key].state}, ${customer[key].country}`;
                else
                  foundProperty = customer[key];

                debugger;
                let isResult = foundProperty.includes(property);
                if(isResult)
                  arregloNuevo[i]= customer;
            }
        }
        i++;
      });
    }
    else{
      debugger;
      SetCustomers(customersMock)
    }
    SetCustomers(arregloNuevo);
  }

  const restartSearch = () => SetCustomers(customersMock);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar findIntems={findIntems} properyOption={properyOption} SetSelectedProperyOPtion={SetSelectedProperyOPtion} restartSearch={restartSearch} />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
