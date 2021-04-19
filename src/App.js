import { Box, Container } from '@material-ui/core';
import CustomerListResults from './Componentes/CustomerListResults';
import CustomerListToolbar from './Componentes/CustomerListToolbar';
import customersMock from './Mock/Customers';
import './App.css';
import { useState } from 'react';

const SetSelectOption = (customers)=>{
  let allOptions = Object.keys(customers[0]);
  let options = allOptions.filter(x=> x !== "id" && x !== "avatarUrl")
  options = [...options,"Checked"]
  return options;
}

function App() {
  const [customers, SetCustomers] = useState(customersMock);
  const [properyOption , SetproperyOption] = useState(SetSelectOption(customersMock));
  const [selectedProperyOPtion,SetSelectedProperyOPtion] = useState("none");
  const [elementSearch,SetElementSearch]= useState("");
  const [checkedCustomer,SetChekedCustomer] = useState([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;
    let selectAllCustomer;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
      selectAllCustomer = [...customers]
    } else {
      newSelectedCustomerIds = [];
    }
    SetChekedCustomer([...checkedCustomer,selectAllCustomer]);
    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (customer) => {
    let id = customer.id;
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];
    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }
    SetChekedCustomer([...checkedCustomer,customer]);
    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const findIntems = (property) => {
    SetElementSearch(property);
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

                let isResult = foundProperty.includes(property);
                if(isResult)
                  arregloNuevo[i]= customer;
            }
        }
        i++;
      });
    }
    else{
      SetCustomers(customersMock)
    }
    SetCustomers(arregloNuevo);
  }

  const restartSearch = () => {
    SetCustomers(customersMock);
    SetElementSearch("");
    SetChekedCustomer([]);
    setSelectedCustomerIds([]);
  }

  const findCustomerCheck = () => SetCustomers(checkedCustomer);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar elementSearch={elementSearch} findCustomerCheck={findCustomerCheck} findIntems={findIntems} properyOption={properyOption} SetSelectedProperyOPtion={SetSelectedProperyOPtion} restartSearch={restartSearch} handleSelectAll={handleSelectAll}/>
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={customers} handleSelectOne={handleSelectOne} selectedCustomerIds={selectedCustomerIds} handleSelectAll={handleSelectAll}/>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
